const multer = require('multer')
const upload = multer();
var pdfReader = require('../src/controllers/pdfRead');
var curricula = require('../src/controllers/curricula');
var auth = require('../src/controllers/authController')

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index');
    });
    
    app.get('/curricula', curricula.getCurricula);
    app.get('/curricula/list', curricula.getAllCurriculas);
    app.get('/pdf', pdfReader.loadPdf);
    app.post('/auth', pdfReader.auth);
    app.post('/notas', pdfReader.getPdf);
    app.get('/captcha', pdfReader.getCaptcha);
    app.get('/getUser',pdfReader.getUserData);
    app.get('/cookie',pdfReader.getCookie);
    app.get('/traer',curricula.getAllCareer)
    app.post('/record', upload.single('pdfFile'),pdfReader.loadPdf);
    
    //app.get('/getPdf', pdfReader.getPdf);

    app.post('/testAuth', auth.auth)
}