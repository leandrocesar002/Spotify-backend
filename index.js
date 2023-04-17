const express = require('express');
const bodyParser = require('body-parser');
const beerStylesRoutes = require('./routes/beerStyles');
const beerRoutes = require('./routes/beer');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;


// Configurações da API
app.use(bodyParser.json());
app.use('/beer-styles', beerStylesRoutes);
app.use('/beer', beerRoutes);
var server

app.get('/', (req, res) => {
    res.send('API da Máquina Cervejeira');
});


if (process.env.NODE_ENV !== 'test') {
    server = app.listen(3000, async () => {
        console.log('Servidor escutando na porta 3000');
    });
}
else {
    server = app.listen(3001, async () => {
        console.log('Servidor escutando na porta 3001');
    });
}


function startServer() {
    return server;
}


module.exports = startServer;