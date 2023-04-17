const express = require('express');
const bodyParser = require('body-parser');
const beerStylesRoutes = require('./routes/beerStyles');
const beerRoutes = require('./routes/beer');


const app = express();
const port = process.env.PORT || 3000;


// Configurações da API
app.use(bodyParser.json());
app.use('/beer-styles', beerStylesRoutes);
app.use('/beer', beerRoutes);

app.get('/', (req, res) => {
    res.send('API da Máquina Cervejeira');
});

app.listen(3000, async () => {
    // console.log('Servidor escutando na porta 3000');
});

