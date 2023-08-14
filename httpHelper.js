const chai = require('chai');
let chaiHttp = require('chai-http');
const xml2js = require('xml2js');
chai.use(chaiHttp);


exports.post = (url, endpoint, params, headers = null) => {
    return new Promise((resolve, reject) => {
         let http = chai.request(url).post(endpoint)
        if (headers && "x-forwarded-for" in headers) {
            http.set("x-forwarded-for", headers["x-forwarded-for"])
        } 
        if(headers && 'Hash' in headers) {
           http.set("Hash", headers["Hash"])
        } 
        if(headers && 'Authenticaton' in headers) {
            http.set("Authentication", headers["Authentication"])
        } 
        if(headers && 'avoidCheckToken' in headers) {
            http.set("avoidCheckToken", headers["avoidCheckToken"])
        } 

        if (headers && 'content-type' in headers) {
            http.set('content-type', headers["content-type"]).send(params).end(function (err, res) {
                var data = "";
                res.on('data', function (chunk) { data += chunk.toString(); });
                res.on("end", function () {
                    parser = new xml2js.Parser();
                    parser.parseString(data, (err, result) => { data = result; });
                    if (err) reject(err);
                    else resolve({ res, data });
                });
            });
        }
        else{
           http.send(params).end( (err, res) => {
            console.timeEnd("outer-loop");
            if (err) reject(err);
            else resolve(res);
         }); 
        }

        
        

        


    });
}
exports.get = (url, endpoint) => {
    return new Promise((resolve, reject) => {
        chai.request(url).get(endpoint).end(function (err, res) {
            if (err) reject(err);
            else resolve(res);
        });
    });
}
exports.put = (url, endpoint, params, headers = null) => {
    return new Promise((resolve, reject) => {
        chai.request(url).put(endpoint).send(params).end(function (err, res) {
            if (err) reject(err);
            else resolve(res);
        });
    });
}