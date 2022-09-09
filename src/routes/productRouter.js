const { Router } = require('express');
const productController = require('../controllers/productController');

const route = Router();

route.get('/', productController.getAll);

route.get('/:id', productController.getById);