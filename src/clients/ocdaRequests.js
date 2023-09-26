var axios = require('axios');
var util = require('../utils/functions');

exports.authInOcda = async function (userData){

    //var data = 'username=' + userData.username + '&userpasw=%242y%2447%249%40J' + userData.password + 'L&captcha=' + userData.captcha;
    var data = 'username=' + userData.username + '&userpasw=' + userData.password + '&captcha=' + userData.captcha;

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
            'Cookie': 'SGASID=' + userData.cookie,
            'X-Requested-With': 'XMLHttpRequest'
        },
        data: data
    };
    try {
        const response = await axios(config);
        console.log(response);
        if (!response.data.login) throw new Error('no login');
        const headers = response.headers['set-cookie'];
        return {logged: util.getStringBetween(headers[0], "SGASID=", "; path")};
    } catch (error) {
        console.log("Error al iniciar sesion en OCDA: ", error);
        return "API_AUTH_ERROR";
    }

}