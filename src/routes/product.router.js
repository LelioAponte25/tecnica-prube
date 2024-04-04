const { getAll, getProductPrice, create, getOne, remove, update } = require('../controllers/product.controllers');
const express = require('express');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)
    .post(create);

productRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

productRouter.route('/:id/nombre')
    .get(getProductPrice)

module.exports = productRouter;