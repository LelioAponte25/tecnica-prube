const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Image = require('../models/Image');
const { Op } = require('sequelize');
const SpecialPrice = require('../models/SpecialPrice');

const getAll = catchError(async (req, res) => {
    const { categoryId, title } = req.query;
    const { inStock } = req.query; // Nuevo

    const where = {};

    if (title) where.title = { [Op.iLike]: `%${title}%` };
    if (categoryId) where.categoryId = categoryId;

    // Agregar condición para inStock
    if (inStock !== undefined) {
        where.inStock = inStock === 'true'; // Convertir a booleano
    }

    console.log(where);
    console.log("Me ejecuté");

    const results = await Product.findAll({
        include: [Category, Image],
        where: where
    });

    return res.json(results);
});

// Obtener el precio especial para el cliente determinado y la marca del producto
const getProductPrice = catchError(async (req, res) => {
    const { user_Id, nombre_producto } = req.params;
    // Buscar el producto por su nombre
    const product = await Product.findOne({
        where: { name: nombre_producto }
    });
    if (!product) return res.sendStatus(404); // Si no se encuentra el producto, devolver 404

    let specialPrice = product.price; // Precio base

    // Buscar si hay un precio especial para el usuario y la marca del producto
    const specialPriceRecord = await SpecialPrice.findOne({
        where: {
            user_Id,
            productId: product.id // Suponiendo que tengas una tabla que relaciona precios especiales con productos
        }
    });

    if (specialPriceRecord) {
        specialPrice = specialPriceRecord.price; // Si se encuentra un precio especial, actualizar el precio especial
    }

    // Devolver el precio especial o el precio base si no hay precio especial
    return res.json({ specialPrice });
});


const create = catchError(async(req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id,{include: [Category, Image]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    getProductPrice,
    create,
    getOne,
    remove,
    update
}