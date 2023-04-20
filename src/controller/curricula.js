const util = require('../utils/unas');


exports.getCurricula = function (req, res) {
    let escuela = util.getFacultadByEP(req.query.ep);
    let curricula = util.curricula(escuela)
    let resp = responseFormat(curricula);
    res.send(resp);
}

function responseFormat(data){
   let response = {
    endpoint: "getCurricula",
    status: typeof data == "string" ? 0 : 1,
    msg: typeof data == "string" ? data : "success",
   }
   if(typeof data != "string")response.data = data;

   return response;
}