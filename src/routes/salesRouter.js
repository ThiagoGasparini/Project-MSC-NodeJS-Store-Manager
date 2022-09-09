const { Router } = require('express');
const salesController = require('../controllers/salesController');

const { salesMiddleware, productId } = require('../middlewares/salesValidator');

const route = Router();

route.post('/', salesMiddleware, productId, salesController.createSale);

route.get('/', salesController.getAll);

route.get('/:id', salesController.getById);

module.exports = route;