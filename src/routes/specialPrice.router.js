const { createSpecialPrice, updateSpecialPrice, getSpecialPrice, deleteSpecialPrice} = require('../controllers/specialPrice.controllers')
const express = require('express');

const specialPriceRouter = express.Router();

specialPriceRouter.route('/')
    .get(getSpecialPrice)
    .post(createSpecialPrice);

specialPriceRouter.route('/:id')
    .put(updateSpecialPrice)
    .delete(deleteSpecialPrice);

module.exports = specialPriceRouter;