const { createSpecialPrice, updateSpecialPrice, getSpecialPrice, deleteSpecialPrice, getProductPrice} = require('../controllers/specialPrice.controllers')
const express = require('express');

const specialPriceRouter = express.Router();

specialPriceRouter.route('/')
    .get(getSpecialPrice)
    .post(createSpecialPrice);

specialPriceRouter.route('/:id')
    .put(updateSpecialPrice)
    .delete(deleteSpecialPrice);

    specialPriceRouter.route('/:userId/:nombre_producto')
    .get(getSpecialPrice);

module.exports = specialPriceRouter;