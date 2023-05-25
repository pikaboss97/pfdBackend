const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const multer = require('multer')
const bodyParser = require('body-parser');
const PDFParser = require('pdf-parse');

var pdfReader = require('./src/controller/pdfRead');
var curricula = require('./src/controller/curricula');


// configuración de las rutas y otros middlewares
const upload = multer();

// Habilitar CORS
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('src/public'));

//Render vies with ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/curricula', curricula.getCurricula);
app.get('/pdf', pdfReader.loadPdf);
app.post('/auth', pdfReader.auth);
app.post('/notas', pdfReader.getPdf);
app.get('/captcha', pdfReader.getCaptcha);
app.get('/getUser',pdfReader.getUserData);
app.get('/cookie',pdfReader.getCookie);
app.get('/traer',curricula.getAllCareer)
app.post('/upload', upload.single('pdfFile'),pdfReader.loadPdf);

//app.get('/getPdf', pdfReader.getPdf);


module.exports = app;