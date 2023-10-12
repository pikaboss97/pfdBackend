const path = require('path');
const PDFParser = require('pdf-parse');
const util = require('../utils/unas');
const convert = require('../utils/functions');
const recordModel = require('../model/Record');
const credentialModel = require('../model/Credentials')
const HtmlTableToJson = require('html-table-to-json');
const fs = require('fs');
var axios = require('axios');
var qs = require('qs');
const { Int32 } = require('bson');

exports.auth = async function (req, res) {
    try {
        let params = req.body;
        let cookie = req.body.cookie;
        let auth = await authOcdaApi(params, cookie);
        if (auth) {
            let data = await credentialModel.findOne({ code: params.username })
            if (data) {
                let student = await getRemoteStudentData(auth);
                if(student.lastSemester.match(/\d{4}-\d{1}/)[0] != data.currentSemester){
                    console.log("------Is new Data-----");
                    let record = await getRemoteRecord(auth, params);
                    let newUserInfo = {
                        currentSemester: student.lastSemester.match(/\d{4}-\d{1}/)[0],
                        curricula: student.curricula.match(/^[^\s]+/)[0],
                        ponderadoS: student.semestralAverage,
                        ponderadoA: student.anualAverage,
                        tc: record.TC,
                        ca: record.CA,
                        cm: record.CM,
                        ea: record.EC,
                        ala: 0,
                        PPP: record.PPP
                    }
                    data = await credentialModel.findOneAndUpdate({ code: params.username }, newUserInfo);
                }
                delete data.password;
                res.status(200).send(data);
            }
            else {
                try {
                    let student = await getRemoteStudentData(auth);
                    if (student.ep != "INGENIERIA EN INFORMATICA Y SISTEMAS") throw "EP-NOT-ALLOWED";
                    if (student.curricula.match(/^[^\s]+/)[0] != "EPIIS2018") throw "CURRICULA-NOT-ALLOWED";
                    let record = await getRemoteRecord(auth, params)
                    let userInfo = {
                        username: record.Alumno,
                        code: params.username,
                        password: params.usr,
                        facultad: record.Facultad,
                        year:record.year,
                        currentSemester: student.lastSemester.match(/\d{4}-\d{1}/)[0],
                        admission: params.username.slice(2, 6),
                        ep: record.EscuelaProfesional,
                        curricula: student.curricula.match(/^[^\s]+/)[0],
                        ponderadoS: student.semestralAverage,
                        ponderadoA: student.anualAverage,
                        tc: record.TC,
                        ca: record.CA,
                        cm: record.CM,
                        ea: record.EC,
                        ala: 0,
                        PPP: record.PPP,
                    }
                    let saved = await credentialModel.create(userInfo);
                    let response = saved;
                    delete response.password;
                    res.status(200).send(response);
                } catch (error) {
                    console.log(error);
                    res.status(423).send({ msg: error.msg });
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
    try {
        let dataBuffer;
    if (!req.file) {
        const baseDir = path.dirname(__dirname);
        dataBuffer = await fs.readFileSync(baseDir + '/assets/0020160604-2' + '.pdf');
    }else{
        dataBuffer = req.file.buffer;
    }

    let data = await PDFParser(dataBuffer);

    let escuela = getStringBetween(data.text, "Escuela Profesional:", "\n");
    let studentCode = Number (getStringBetween(data.text, "Universitario:", "\n").slice(2,6)) > 2018 ? "V2": "";
    let mallaActual = escuela+studentCode; 
    let malla = util.curricula(mallaActual);
    let semestres = getStringBetween(data.text, "N°", "\n", "g");

    let avanceCurricular = getCoursesBySemester(data.text, semestres, malla);

    console.log(avanceCurricular);
    res.send(avanceCurricular)

    let asignaturas = getCoursesByCode(data.text, malla);




    let matriculados = getCoursesByCode(data.text.substring(data.text.indexOf(semestres[semestres.length - 1])), malla);
    if(matriculados.resp.length > 0) matriculados.resp[0] ? matriculados:matriculados.resp =[];
   
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
        Object.keys(malla).forEach(curso => {
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
    //res.send(response);
/* 
    if(req.file){
        const excelFile = convert.jsonToExcel(asignaturas.resp)
        let filename = response.Alumno.replace(" ","_");
        res.attachment(filename.replace(",","")+'.xlsx');
        res.send(excelFile);
    }else{
        res.send(response);
    }
   */
    } catch (error) {
        res.status(500).send(error);
    }
}

function getCoursesBySemester(record, semestres, malla){
    
    let response = [];
    let cursos;
    for (let i = 0; i < semestres.length; i++) {
      let semestre = semestres[i];
      if (i != semestres.length-1) {
        let semestreText = getStringBetween(record,"N°" + semestre,"N°" + semestres[i + 1],"s");
        cursos = getCoursesByCodeV2(semestreText, malla);
        response.push(formatSemesterResponse(semestre, cursos));
      }else {
        cursos = getCoursesByCodeV2(getStringBetween(record,"N°" + semestre,"Universidad Nacional Agraria de la Selva","s"), malla);
        response.push(formatSemesterResponse(semestre, cursos));

      }
    }
    return response;
}

function formatSemesterResponse(semestre, cursos){
    let numeros = semestre.match(/\d+/); //obtiene todos los numeros del semestre
    let response = {
        "N°": numeros[0],
        "semestre": getStringBetween(semestre,numeros[0],"Matriculado"),
        "estado": "Matriculado",
        "creditos_cursados": cursos.stats.coursedCredits,
        "creditos_aprobados":cursos.stats.approvedCredits,
        "puntos_por_semestre":cursos.stats.pointsPerSemester,
        "promedio_ponderado_semestral":"",
        "total_creditos_cursados":"",
        "total_creditos_aprobados": "",
        "total_puntos_acumulados":"",
        "promedio_ponderado_acumulado":"",
        "condicion":"",
        "cursos":cursos.resp
    };
    return response;

}
function getCoursesByCodeV2(record, cursos) {
    const freeCoursesList = util.getFreeCourses();
    let resp = [];
    let stats = {
        coursedCredits:0,
        approvedCredits:0,
        electiveNumber:0,
        pointsPerSemester:0,
        ponderado_semestral:0

    };
    try {
        Object.keys(cursos).forEach(curso => {

            let asign = getStringBetween(record, curso, "\n", "g") ?? '';

            if (asign) {
                asign.map((e) => {
                  let puntos = e.match(new RegExp("/20" + "(.*)" + "     "))[1].slice(4);
                  let response = {
                    codigo: curso,
                    nombre: cursos[curso].nombre,
                    num_desaprobado: "[1]",
                    fecha_examen: "20/07/1997",
                    horas_teoricas: "2",
                    horas_practicas: "2",
                    creditos: puntos[0],
                    nota: getCalification(puntos),
                    nota_por_creditos: puntos[0] * getCalification(puntos),
                    electivo: cursos[curso].electivo ? true : false,
                    aprobado: getCalification(puntos) > 10 ? true : false,
                  };

                  stats.coursedCredits += puntos[0]*1;
                  if (getCalification(puntos) > 10) stats.approvedCredits += puntos[0]*1;
                  if (cursos[curso].electivo && getCalification(puntos) > 10) stats.electiveNumber++;
                  if (cursos[curso].al || cursos[curso].cat) {
                    response.libre = true;
                    response.type = cursos[curso].cat
                      ? cursos[curso].cat
                      : cursos[curso].type;
                  }
                  stats.pointsPerSemester += response.nota_por_creditos;
                  resp.push(response);
                });
            }
        });


        Object.keys(freeCoursesList).forEach(libre => {
            let freeCourse = getStringBetween(record, libre, "\n", "g") ?? '';
            if(freeCourse){
                freeCourse.map((e) => {
                    let puntos = e.match(new RegExp("/20" + "(.*)" + "     "))[1].slice(4);
                    let response = {
                      codigo: libre,
                      nombre: freeCoursesList[libre].nombre,
                      num_desaprobado: "[1]",
                      fecha_examen: "20/07/1997",
                      horas_teoricas: "0",
                      horas_practicas: "2",
                      creditos: puntos[0],
                      nota: getCalification(puntos),
                      nota_por_creditos: puntos[0] * getCalification(puntos),
                      electivo: false,
                      aprobado: getCalification(puntos) > 10 ? true : false,
                      libre: true,
                      tipo: freeCoursesList[libre].type,
                    };
  
                    stats.coursedCredits += puntos[0]*1;
                    if (getCalification(puntos) > 10) stats.approvedCredits += puntos[0]*1;
                    stats.pointsPerSemester += response.nota_por_creditos;
                    resp.push(response);
                  });
            }

        })


        return { resp, stats };

    } catch (error) {
        console.log(error);
        return { resp, electiveNumber }
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
                                c.aprobado = getCalification(puntos) > 10 ? true : false;
                                c.electivo = cursos[curso].electivo ? true : false;
                                if (cursos[curso].electivo && getCalification(puntos) > 10){
                                    electiveNumber++;
                                }
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
                        if (cursos[curso].electivo && getCalification(puntos) > 10){
                            electiveNumber++;
                        } 
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
        if (isglobal == "g") {
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
        }else if(isglobal == "s"){
            result = str.match(new RegExp(`${start}(.*)${end}`, "s"))[1];
        } else {
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
    //var data = 'username=' + user.username + '&userpasw=%242y%2447%249%40J' + user.password + 'L&captcha=' + user.captcha;
    var data = 'username=' + user.username + '&userpasw=' + user.usr + '&captcha=' + user.captcha;
    var config = {
        method: 'post',
        url: 'https://academico.unas.edu.pe/login',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0', 
            'Accept': 'application/json, text/javascript, */*; q=0.01', 
            'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3', 
            'Accept-Encoding': 'gzip, deflate, br', 
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
            'X-Requested-With': 'XMLHttpRequest', 
            'Origin': 'https://academico.unas.edu.pe', 
            'Connection': 'keep-alive', 
            'Referer': 'https://academico.unas.edu.pe/login', 
            'Cookie': '_ga=GA1.3.1933063879.1683562570; _ga_1M9SJETZ2K=GS1.1.1688164978.2.0.1688164978.60.0.0; _ga_0LF75RCN2N=GS1.3.1692120743.4.0.1692120743.0.0.0; _ga_RY1QMTE0D9=GS1.1.1695764912.3.1.1695786940.59.0.0; _gid=GA1.3.680243158.1695764913; SGASID=' + cookie + '; SGASID='+ cookie +';', 
            'Sec-Fetch-Dest': 'empty', 
            'Sec-Fetch-Mode': 'cors', 
            'Sec-Fetch-Site': 'same-origin'
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
            url: 'https://academico.unas.edu.pe/',
            headers: { 
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0', 
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 
              'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3', 
              'Accept-Encoding': 'gzip, deflate, br', 
              'Connection': 'keep-alive', 
              'Referer': 'https://academico.unas.edu.pe/login', 
              'Cookie': '_ga=GA1.3.1933063879.1683562570; _ga_1M9SJETZ2K=GS1.1.1688164978.2.0.1688164978.60.0.0; _ga_0LF75RCN2N=GS1.3.1692120743.4.0.1692120743.0.0.0; _ga_RY1QMTE0D9=GS1.1.1696022803.6.1.1696022839.24.0.0; _gid=GA1.3.1029263032.1695944095; _gat_gtag_UA_34189061_1=1; SGASID='+cookie, 
              'Upgrade-Insecure-Requests': '1', 
              'Sec-Fetch-Dest': 'document', 
              'Sec-Fetch-Mode': 'navigate', 
              'Sec-Fetch-Site': 'same-origin', 
              'Sec-Fetch-User': '?1'
            }
          };
        const response = await axios(config);
        if (!response.data) throw new Error('no student data');
        let tableData = response.data.match(/<tbody>([\s\S]*?)<\/tbody>/g)[0];
        let jsonTables = HtmlTableToJson.parse("<table> "+tableData+" </table>");
        let studentInfo = jsonTables.results[0].map(objeto => Object.values(objeto)[1]);
        if (studentInfo.length == 0) throw new Error('no table decode data');
        let resp = {
            ep: studentInfo[0],
            code: studentInfo[1],
            curricula: studentInfo[2].replace(/\t/g, '').replace(/\n/g, ' '),
            lastSemester: studentInfo[3].replace(/\t/g, '').replace(/\n/g, ' '),
            semestralAverage: studentInfo[4],
            anualAverage: studentInfo[5],
            studentState: studentInfo[6].replace(/\t/g, '').replace(/\n/g, ' ') 
        }
        return resp;
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
        let year = getStringBetween(data.text, "Universitario:", "\n").slice(2,6);
        let studentCode = Number (year) >= 2018 ? "V2": "";
        let mallaActual = escuela+studentCode; 
        let pppCourse = Object.values(util.curricula(mallaActual)).find(elemento => elemento.ppp === true);
        let semestres = getStringBetween(data.text, "N°", "Matriculado", "g");
        let asignaturas = getCoursesByCode(data.text, util.curricula(mallaActual));
        let pppStatus =  asignaturas.resp.find(asign => pppCourse.codigo === asign.codigo) ? pppCourse.creditos + "-" + pppCourse.creditos: 0 + "-" + pppCourse.creditos;
        let matriculados = getCoursesByCode(data.text.substring(data.text.indexOf(semestres[semestres.length - 1])), util.curricula(mallaActual));
        if(matriculados.resp[0].nota > 0) matriculados.resp =[];

        //let listSemestres = getStringBetween(data.text, "N°", "\n", "g");
        //let avanceCurricular = getCoursesBySemester(data.text, listSemestres, util.curricula(mallaActual));
        //console.log(avanceCurricular);
        
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


        let approvedCredits = asignaturas.resp.reduce((acumulador, actual) => {
            if (actual.aprobado) acumulador += actual.creditos * 1;
            return acumulador;
        }, 0);

        if(asignaturas.electiveNumber > 4){
            approvedCredits = approvedCredits - ((asignaturas.electiveNumber-4)*3);
        }

        let registeredCredits = matriculados.resp.reduce((acumulador, actual) => {
            acumulador += actual.creditos * 1;
            return acumulador;
        }, 0);

        let response = {
            "Facultad": getStringBetween(data.text, "Facultad:", "\n"),
            "EscuelaProfesional": escuela,
            "Alumno": getStringBetween(data.text, "Apellidos y Nombre:", "Código"),
            "Code": getStringBetween(data.text, "Universitario:", "\n"),
            "year": year,
            "TC": util.curriculaByCurso(mallaActual, 'TOTALCREDITS'),
            "CA": approvedCredits,
            "CM": registeredCredits,
            "EC": asignaturas.electiveNumber,
            "PPP": pppStatus,
            "Asignaturas": asignaturas.resp
        }
        let saved = await recordModel.findOneAndUpdate({ Code: response.Code },{ $set: response },{ upsert: true, new: true });
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
