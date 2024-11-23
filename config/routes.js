const multer = require('multer')
const upload = multer();
const verifyToken = require('./validateToken');
var pdfReader = require('../src/controllers/pdfRead');
var curricula = require('../src/controllers/curricula');
var auth = require('../src/controllers/authController')
var user = require('../src/controllers/userController')


module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index');
    });
    
    app.get('/curricula', curricula.getCurricula);
    app.get('/curricula/list', curricula.getAllCurriculas);
    app.get('/pdf', pdfReader.loadPdf);
    app.post('/auth', pdfReader.auth);
    app.post('/user/update',verifyToken, user.updateUserData);
    app.post('/notas', pdfReader.getPdf);
    app.get('/captcha', pdfReader.getCaptcha);
    app.get('/getUser', verifyToken, pdfReader.getUserData);
    app.get('/cookie',pdfReader.getCookie);
    app.get('/traer',curricula.getAllCareer)
    app.post('/record', upload.single('pdfFile'),pdfReader.loadPdf);
    app.post('/validate', verifyToken , (req, res) => {res.status(201).send({status: true, msg: "success"})});
    
    //app.get('/getPdf', pdfReader.getPdf);

    app.post('/testAuth', auth.auth);
    
}