const app = require('./config');
const db = require('./database');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

db()