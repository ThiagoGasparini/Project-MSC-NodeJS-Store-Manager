const express = require('express');
const productRoute = require('./src/routes/productRouter');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoute);

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;