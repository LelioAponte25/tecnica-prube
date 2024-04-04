const express = require('express');
const userRouter = require('./user.router');
const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const categoryRouter = require('./category.router');
const specialPriceRouter = require('./specialPrice.router');
const router = express.Router();

// colocar las rutas aquí

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/images', imageRouter)
router.use('/categories', categoryRouter)
router.use('/specialPrice', specialPriceRouter)


module.exports = router;