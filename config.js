const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var pdfReader = require('./src/controller/pdfRead');
var curricula = require('./src/controller/curricula');


// configuración de las rutas y otros middlewares

// Habilitar CORS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('¡Hola, mundo!');
});

app.get('/curricula', curricula.getCurricula);
app.get('/pdf', pdfReader.loadPdf);
app.post('/auth', pdfReader.auth);
app.post('/notas', pdfReader.getPdf);
app.get('/captcha', pdfReader.getCaptcha);
app.get('/getUser',pdfReader.getUserData)

//app.get('/getPdf', pdfReader.getPdf);


module.exports = app;