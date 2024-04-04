const { getAll, create, getOne, remove, update } = require('../controllers/product.controllers');
const express = require('express');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)
    .post(create);

productRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = productRouter;