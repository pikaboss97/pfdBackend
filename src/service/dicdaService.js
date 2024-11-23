const cheerio = require('cheerio');
const axios = require('axios');
var util = require('../utils/functions');

exports.getRemoteStudentData =  async (token) => {
  try {
    let route = 'load=StudentInformationController%40index&codsem=2024-2';
    const data = await dicdaApiRequest(route, token);
    const $ = cheerio.load(data);
    const fullName = $('h3.text-center.text-green').text().trim();
    const professionalSchool = $('p:contains("ESCUELA PROFESIONAL")').text().trim();
    const studyPlan = $('p:contains("PLAN DE ESTUDIOS")').text().trim();
    const institutionalEmail = $('#institutional_email').val();
    const personalEmail = $('#personal_email').val();
    const studentImage = $('img[alt="image"]').attr('src');
    const cellphone1 = $('#cellphone1').val();
    const cellphone2 = $('#cellphone2').val();
    let userData = {fullName, professionalSchool, studyPlan, institutionalEmail, personalEmail, studentImage, cellphone1, cellphone2 };
    return userData;
  } catch (error) {
    console.log("Error al obtener la informacion remota del estudiante: ", error);
    throw new Error(error);
  }

}

exports.authInOcda = async (userData) => {

  var data = 'username=' + userData.username + '&userpasw=' + userData.password + '&captcha=' + userData.captcha;
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
          'Cookie': '_ga=GA1.3.1933063879.1683562570; _ga_1M9SJETZ2K=GS1.1.1688164978.2.0.1688164978.60.0.0; _ga_0LF75RCN2N=GS1.3.1692120743.4.0.1692120743.0.0.0; _ga_RY1QMTE0D9=GS1.1.1695764912.3.1.1695786940.59.0.0; _gid=GA1.3.680243158.1695764913; SGASID=' + userData.cookie + '; SGASID='+ userData.cookie +';', 
          'Sec-Fetch-Dest': 'empty', 
          'Sec-Fetch-Mode': 'cors', 
          'Sec-Fetch-Site': 'same-origin'
      },
      data: data
  };
  try {
      const response = await axios(config);
      if (!response.data.login) throw response.data.message;
      const respCookie = response.headers['set-cookie'];
      return {cookie: util.getStringBetween(respCookie[0], "SGASID=", "; path")};
  } catch (error) {
      console.log("Error al iniciar sesion en dicda: ", error);
      throw new Error(error);
  }

}


async function dicdaApiRequest(route, token) {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://academico.unas.edu.pe/',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
              'Pragma': 'no-cache', 
              'Accept': 'text/html, */*; q=0.01', 
              'Sec-Fetch-Site': 'same-origin', 
              'Accept-Language': 'es-419,es;q=0.9', 
              'Cache-Control': 'no-cache', 
              'Sec-Fetch-Mode': 'cors', 
              'Accept-Encoding': 'gzip, deflate, br', 
              'Origin': 'https://academico.unas.edu.pe', 
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15', 
              'Referer': 'https://academico.unas.edu.pe/', 
              'Content-Length': '55', 
              'Connection': 'keep-alive', 
              'Host': 'academico.unas.edu.pe', 
              'Sec-Fetch-Dest': 'empty', 
              'Cookie': '_ga=GA1.1.242600544.1725044623; _ga_RY1QMTE0D9=GS1.1.1728780372.2.1.1728780650.59.0.0; _gat_gtag_UA_34189061_1=1; _gid=GA1.3.1211504173.1728780373; SGASID=' + token + '; SGASID=' + token, 
              'X-Requested-With': 'XMLHttpRequest'
            },
            data : route
          };
    
          const response = await axios(config);
          if (!response.data) throw new Error("empty or null data");    
          return response.data;
    } catch (error) {
      console.log("Error al consultar informacion remota en la ruta: ",route);
      console.log(error);
      throw new Error(error);
    }



}