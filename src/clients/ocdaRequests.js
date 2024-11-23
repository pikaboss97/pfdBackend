var axios = require('axios');
var util = require('../utils/functions');
const HtmlTableToJson = require('html-table-to-json');
const { log } = require('console');

exports.authInOcda = async function (userData){

    //var data = 'username=' + userData.username + '&userpasw=%242y%2447%249%40J' + userData.password + 'L&captcha=' + userData.captcha;
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
        return error;
    }

}

exports.getRemoteStudentData = async function (cookie) {
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
            fullName: util.getStringBetween(response.data, 'class="heading-title">\n', '\n', true).trim().replace(/<\/?[^>]+(>|$)/g, ""),
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