const path = require('path');
const PDFParser = require('pdf-parse');
const util = require('../utils/unas');
const convert = require('../utils/functions');
const recordModel = require('../model/Record');
const credentialModel = require('../model/Credentials')
const fs = require('fs');
var axios = require('axios');
var qs = require('qs');

exports.auth = async function (req, res) {
    try {
        let params = req.body;
        let cookie = req.body.cookie;
        let auth = await authOcdaApi(params, cookie);
        if (auth) {
            const data = await credentialModel.findOne({ code: params.username })
            if (data) {
                delete data.password;
                res.status(200).send(data);
            }
            else {
                try {
                    //let data = await getRemoteStudentData(auth)
                    let record = await getRemoteRecord(auth, params)
                    let userInfo = {
                        username: record.Alumno,
                        code: params.username,
                        password: params.usr,
                        facultad: record.Facultad,
                        admission: params.username.slice(2, 6),
                        ep: record.EscuelaProfesional,
                        tc: record.TC,
                        ca: record.CA,
                        cm: record.CM,
                        ea: record.EC,
                        ala: 0
                    }
                    let saved = await credentialModel.create(userInfo);
                    let response = saved;
                    delete response.password;
                    res.status(200).send(response);
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ msg: 'SAVE_INFO_ERROR' });
                }
            }
        } else {
            res.status(401).send({ msg: 'AUTH_ERROR' });
        }
    } catch (error) {
        res.status(500).send({ msg: 'SERVER_ERROR' });
    }
}

exports.getPdf = async function (req, res) {
    let params = req.body;
    const data = await recordModel.findOne({ Code: params.username })
    res.send(data);
}

exports.getUserData = async function (req, res) {
    try {
        let params = req.query;
        const data = await credentialModel.findOne({ code: params.code })
        delete data.password;
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("USER_NOT_FOUND");
    }
}

exports.getCaptcha = async function (req, res) {
    try {
        let cookie = req.query.c;
        const data = await getNewCaptcha(cookie)
        let captcha = getStringBetween(data, 'id="capcode" src="', '" alt');
        res.status(200).send(captcha);
    } catch (error) {
        res.status(500).send("CAPTCHA_NOT_FOUND");
    }
}
exports.getCookie = async function (req, res) {
    try {
        const data = await getNewCookie()
        let cookie = getStringBetween(data[0], 'SGASID=', '; path=/');
        res.status(200).send(cookie);
    } catch (error) {
        console.log(error);
        res.status(500).send("COOKIE_NOT_FOUND");
    }
}

exports.loadPdf = async function (req, res) {
    let dataBuffer;
    if (!req.file) {
        const baseDir = path.dirname(__dirname);
        dataBuffer = await fs.readFileSync(baseDir + '/assets/0020160604' + '.pdf');
    }else{
        dataBuffer = req.file.buffer;
    }

    let data = await PDFParser(dataBuffer);
    let escuela = getStringBetween(data.text, "Escuela Profesional:", "\n");
    let semestres = getStringBetween(data.text, "N°", "Matriculado", "g");
    let mallaActual = req.file ? escuela+req.body.Year : escuela; 
    let asignaturas = getCoursesByCode(data.text, util.curricula(mallaActual));

    let matriculados = getCoursesByCode(data.text.substring(data.text.indexOf(semestres[semestres.length - 1])), util.curricula(escuela));
    let freeCourses = getCoursesByCode(data.text, util.getFreeCourses());
    freeCourses.resp.forEach(item => {
        let isok = asignaturas.resp.find(item2 => item.type === item2.type);
        if (!isok) {
            let isMatriculado = matriculados.resp.find(m => item.codigo === m.codigo);
            let curso = util.cursoByType(mallaActual, item.type)
            let param = {
                "nombre": curso.nombre,
                "codigo": curso.codigo,
                "creditos": curso.creditos,
                "electivo": item.electivo,
                "aprobado": item.aprobado,
                "nota": item.nota,
                "matriculado": isMatriculado ? true : false
            }
            asignaturas.resp.push(param);
        }
    });

    asignaturas.resp.forEach(item1 => {
        const isMatriculado = matriculados.resp.find(item2 => item1.codigo === item2.codigo);
        item1.matriculado = isMatriculado ? true : false;
    });

    if(req.file){
        Object.keys(util.curricula(mallaActual)).forEach(curso => {
            const cursos = asignaturas.resp.find(item => curso === item.codigo);
            if(!cursos){
                let cursoOfCurricula = util.curriculaByCurso(mallaActual,curso);
                if(!cursoOfCurricula.electivo && typeof(cursoOfCurricula) == "object" ){
                    let param = {
                        "nombre": cursoOfCurricula.nombre,
                        "codigo": cursoOfCurricula.codigo,
                        "creditos": cursoOfCurricula.creditos,
                        "electivo": false,
                        "aprobado": false,
                        "nota": "No cursado",
                        "matriculado": false
                    }
                    asignaturas.resp.push(param)
                }
    
                
            }
        });
    }

    let approvedCredits = asignaturas.resp.reduce((acumulador, actual) => {
        if (actual.aprobado) acumulador += actual.creditos * 1;
        return acumulador;
    }, 0);

    let registeredCredits = matriculados.resp.reduce((acumulador, actual) => {
        acumulador += actual.creditos * 1;
        return acumulador;
    }, 0);

    let response = {
        "Facultad": getStringBetween(data.text, "Facultad:", "\n"),
        "EscuelaProfesional": escuela,
        "Alumno": getStringBetween(data.text, "Apellidos y Nombre:", "Código"),
        "Code": getStringBetween(data.text, "Universitario:", "\n"),
        "TC": util.curriculaByCurso(mallaActual, 'TOTALCREDITS'),
        "CA": approvedCredits,
        "CM": registeredCredits,
        "EC": asignaturas.electiveNumber,
        "Asignaturas": asignaturas.resp
    }
    //let saved = await recordModel.create(response);
    //console.log(saved);
    if(req.file){
        const excelFile = convert.jsonToExcel(asignaturas.resp)
        let filename = response.Alumno.replace(" ","_");
        res.attachment(filename.replace(",","")+'.xlsx');
        res.send(excelFile);
    }else{
        res.send(response);
    }
   
}

function getCoursesByCode(record, cursos) {
    let resp = [];
    let electiveNumber = 0;
    try {
        Object.keys(cursos).forEach(curso => {
            let asign = getStringBetween(record, curso, "\n", "g") ?? '';
            if (asign.length > 0) {
                asign.map(e => {
                    let puntos = e.match(new RegExp("/20" + "(.*)" + "     "))[1].slice(4);
                    let duplicate = resp.find(({ codigo }) => codigo === curso);
                    if (duplicate) {
                        resp.map((c) => {
                            if (c.codigo === duplicate.codigo) {
                                c.nota = [...c.nota, getCalification(puntos)];
                                c.aprobado = getCalification(puntos) > 10 ? true : false,
                                    c.electivo = cursos[curso].electivo ? true : false
                            }
                            return c;
                        })
                    } else {
                        let response = {
                            "nombre": cursos[curso].nombre,
                            "codigo": curso,
                            "creditos": puntos[0],
                            "electivo": cursos[curso].electivo ? true : false,
                            "aprobado": getCalification(puntos) > 10 ? true : false,
                            "nota": getCalification(puntos),
                        }
                        if (cursos[curso].electivo && getCalification(puntos) > 10) electiveNumber++;
                        if (cursos[curso].al || cursos[curso].cat) {
                            response.libre = true;
                            response.type = cursos[curso].cat ? cursos[curso].cat : cursos[curso].type
                        }
                        resp.push(response);
                    }
                })
            }
        });
        return { resp, electiveNumber };
    } catch (error) {
        console.log(error);
        return { resp, electiveNumber }
    }
}

function getCalification(values) {

    let creditos = values[0];
    values = values.slice(1);
    let nota = creditos * values[0] == values.slice(1, values.length) ? values[0] : values.slice(0, 2)
    return nota;
}

function getStringBetween(str, start, end, isglobal = false) {
    try {
        let result = [];
        if (isglobal) {
            //if(start == 'L0006')console.log(str);
            for (const match of str.matchAll(new RegExp(`${start}(.*)${end}`, isglobal))) {
                if (match && match[1].length == 0) {
                    try {
                        let temp = str.match(new RegExp(`${match[0]}(.*)${"    \n"}`, "s"));
                        let m = temp[1].match(new RegExp(`${"    \n"}`));
                        let subcadena = temp[1].substring(0, m.index);
                        let resp = subcadena.replace(/\n/g, '');
                        result.push(resp + '        ');
                    } catch (error) {
                        //implementar codigo para que el usuario pueda validar el estado del curso si ya no se pudo validar por codigo
                        console.log("error in geetStringBetween ", error);
                    }
                } else {
                    result.push(match[1])
                }
            }
        } else {
            //console.log(str.match(new RegExp(`${start}(.*)${end}`)));
            result = str.match(new RegExp(`${start}(.*)${end}`))[1];
        }
        return result;
    } catch (error) {
        console.log("Error al obtener la informacion mediante Regex:  ", error);
        return error;
    }

}

async function GetRecordByFetch(cookie, code) {
    var data = qs.stringify({
        'load': 'StudentRecordNotesController@export',
        'data[studentId]': code
    });
    var config = {
        method: 'post',
        url: 'https://academico.unas.edu.pe/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': '_ga=GA1.3.1493189822.1681845187; _gid=GA1.3.1258299258.1681845187; SGASID=' + cookie,
            'Host': 'academico.unas.edu.pe'
        },
        data: data,
        responseType: 'arraybuffer'
    };
    try {
        const response = await axios(config);
        const pdfBuffer = Buffer.from(response.data, 'binary');
        return pdfBuffer;
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
        return error;
    }
}

async function authOcdaApi(user, cookie) {
    var data = 'username=' + user.username + '&userpasw=%242y%2447%249%40J' + user.password + 'L&captcha=' + user.captcha;
    var config = {
        method: 'post',
        url: 'https://academico.unas.edu.pe/login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'es-419,es;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'academico.unas.edu.pe',
            'Origin': 'https://academico.unas.edu.pe',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
            'Connection': 'keep-alive',
            'Referer': 'https://academico.unas.edu.pe/login',
            'Content-Length': '127',
            'Cookie': 'SGASID=' + cookie,
            'X-Requested-With': 'XMLHttpRequest'
        },
        data: data
    };
    try {
        const response = await axios(config);
        if (!response.data.login) throw new Error('no login');
        const headers = response.headers['set-cookie'];
        return getStringBetween(headers[0], "SGASID=", "; path");
    } catch (error) {
        return null;
    }
}
async function getRemoteStudentData(cookie) {
    try {
        var config = {
            method: 'get',
            url: 'https://academico.unas.edu.pe/alumno',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Pragma': 'no-cache',
                'Cookie': '_ga=GA1.3.1977725257.1682133790; _gid=GA1.3.1927325883.1682133790; SGASID=' + cookie,
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache',
                'Host': 'academico.unas.edu.pe',
                'Accept-Language': 'es-419,es;q=0.9',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
                'Referer': 'https://academico.unas.edu.pe/',
                'Connection': 'keep-alive'
            }
        };
        const response = await axios(config);
        if (!response.data) throw new Error('no student data');
        console.log(response.data);
        return true;
        //return getStringBetween(response.data, "SGASID=", "; path");
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getRemoteRecord(cookie, user) {
    try {
        const baseDir = path.dirname(__dirname);
        const buffer = await GetRecordByFetch(cookie, user.username);
        let data = await PDFParser(buffer);
        let escuela = getStringBetween(data.text, "Escuela Profesional:", "\n");
        let semestres = getStringBetween(data.text, "N°", "Matriculado", "g");
        let asignaturas = getCoursesByCode(data.text, util.curricula(escuela));
        let ponderados = false;

        let matriculados = getCoursesByCode(data.text.substring(data.text.indexOf(semestres[semestres.length - 1])), util.curricula(escuela));
        let freeCourses = getCoursesByCode(data.text, util.getFreeCourses());
        freeCourses.resp.forEach(item => {
            let isok = asignaturas.resp.find(item2 => item.type === item2.type);
            if (!isok) {
                let isMatriculado = matriculados.resp.find(m => item.codigo === m.codigo);
                let curso = util.cursoByType(escuela, item.type)
                let param = {
                    "nombre": curso.nombre,
                    "codigo": curso.codigo,
                    "creditos": curso.creditos,
                    "electivo": item.electivo,
                    "aprobado": item.aprobado,
                    "nota": item.nota,
                    "matriculado": isMatriculado ? true : false
                }
                asignaturas.resp.push(param);
            }
        });

        asignaturas.resp.forEach(item1 => {
            const isMatriculado = matriculados.resp.find(item2 => item1.codigo === item2.codigo);
            item1.matriculado = isMatriculado ? true : false;
        });


        let approvedCredits = asignaturas.resp.reduce((acumulador, actual) => {
            if (actual.aprobado) acumulador += actual.creditos * 1;
            return acumulador;
        }, 0);

        let registeredCredits = matriculados.resp.reduce((acumulador, actual) => {
            acumulador += actual.creditos * 1;
            return acumulador;
        }, 0);

        let response = {
            "Facultad": getStringBetween(data.text, "Facultad:", "\n"),
            "EscuelaProfesional": escuela,
            "Alumno": getStringBetween(data.text, "Apellidos y Nombre:", "Código"),
            "Code": getStringBetween(data.text, "Universitario:", "\n"),
            "TC": util.curriculaByCurso(escuela, 'TOTALCREDITS'),
            "CA": approvedCredits,
            "CM": registeredCredits,
            "EC": asignaturas.electiveNumber,
            "Asignaturas": asignaturas.resp
        }
        let saved = await recordModel.create(response);
        return saved;
    } catch (error) {
        console.log(error);
        return "NOT_FOUND"
    }
}

async function getNewCaptcha(cookie) {
    var config = {
        method: 'get',
        url: 'https://academico.unas.edu.pe/login',
        headers: {
            'Cookie': 'SGASID=' + cookie + '; _ga=GA1.3.1493189822.1681845187; _gat_gtag_UA_34189061_1=1; _gid=GA1.3.1258299258.1681845187; SGASID=' + cookie,
            'Connection': 'keep-alive'
        }
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log("no se pudo obtener el captcha");
        return error
    }
}

async function getNewCookie() {
    var config = {
        method: 'get',
        url: 'https://academico.unas.edu.pe'
    };

    try {
        const response = await axios(config);
        const headers = response.headers['set-cookie'];
        return headers;
    } catch (error) {
        console.log("no se pudo obtener el cookie");
        return error
    }
}
