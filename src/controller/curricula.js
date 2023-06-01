const util = require('../utils/unas');
var axios = require('axios');
const cheerio = require('cheerio')



exports.getCurricula = function (req, res) {
    let escuela = util.getFacultadByEP(req.query.ep);
    let curricula = util.curricula(escuela)
    let resp = responseFormat(curricula);
    res.send(resp);
}

exports.getAllCurriculas = function (req, res) {
    let resp = {
        endpoint: "getAllCurriculas",
        status: 1,
        msg: "success",
        list: [
            {
                escuelaP: "INGENIERIA EN INFORMATICA Y SISTEMAS",
                facultad: "INGENIERIA EN INFORMATICA Y SISTEMAS",
                codigo: "IS03",
                year: "2018",
                credits:"215",
                status:"VIGENTE",
                requestCode: "FIIS2018"

            },
            {
                escuelaP: "INGENIERIA EN INFORMATICA Y SISTEMAS",
                facultad: "INGENIERIA EN INFORMATICA Y SISTEMAS",
                codigo: "NEIS",
                year: "2009",
                status:"NO VIGENTE",
                credits:"215",
                requestCode: "FIIS2009"

            }
        ]
    }
    res.send(resp);
}

exports.getAllCareer = async function (req, res) {
    //GET ALL LIST OF CAREERS
    var config = {
        method: 'get',
        url: 'https://academico.unas.edu.pe/planes-de-estudio',
    };
    const response = await axios(config);
    let data = response.data.slice(response.data.indexOf('<article '), response.data.indexOf('<footer '));
    let careerList = getStringBetween(data, 'href="/planes-de-estudio/', '">', "g")
    //let careerList = ['fiis-epiis'];
    //GET CURRICULAS BY CAREER
    let allCarrers = [];
    for (car in careerList) {
        let curriculas = await getAllCurriculaByCareer(careerList[car]);
        allCarrers.push(curriculas);
    }
    res.send(allCarrers)
}

async function getAllCurriculaByCareer(url) {
    var data = 'load=SemesterController%40show';
    var config = {
        method: 'get',
        url: 'https://academico.unas.edu.pe/planes-de-estudio/' + url,
        data: data
    };
    const response = await axios(config);
    let tableString = response.data.slice(response.data.indexOf('<table '), response.data.indexOf('</table>') + 8);
    let planesList = getStringBetween(tableString, 'href="/planes-de-estudio/' + url + '/', '" style=', "g");
    let curriculas = await getCurriculaByYear(planesList);
    console.log(curriculas);
    // cargar la tabla HTML con cheerio
    const $ = cheerio.load(tableString)
    // obtener las filas de la tabla y convertirlas a JSON
    const filas = $('tr').toArray().map((fila, index) => {
        const celdas = $(fila).find('td').toArray().map(celda => $(celda).text())
        let response = {
            name: celdas[0],
            year: celdas[1],
            status: celdas[2],
            credits: celdas[3],
            code: planesList[index - 1],
            cursos: celdas[0] ? curriculas[index - 1] : {}
        }
        return response
    })
    filas.shift()
    console.log(filas);
    return filas;

}

async function getCurriculaByYear(plan) {
    
    return plan;
}

function responseFormat(data) {
    let response = {
        endpoint: "getCurricula",
        status: typeof data == "string" ? 0 : 1,
        msg: typeof data == "string" ? data : "success",
    }
    if (typeof data != "string") response.data = data;

    return response;
}

function getStringBetween(str, start, end, isglobal = false) {
    try {
        let result = [];
        if (isglobal) {
            for (const match of str.matchAll(new RegExp(`${start}(.*)${end}`, isglobal))) {
                result.push(match[1])
            }
        } else {
            result = str.match(new RegExp(`${start}(.*)${end}`));
        }
        return result;
    } catch (error) {
        console.log("Error al obtener la informacion mediante Regex:  ", error);
        return error;
    }

}