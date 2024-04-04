const catchError = require('../utils/catchError');
const SpecialPrice = require('../models/SpecialPrice');
const Product = require('../models/Product');
const User = require('../models/User');

// Crear un nuevo precio especial
const createSpecialPrice = catchError(async (req, res) => {
    const {price, startDate, endDate, userId, productId} = req.body;
    const specialPrice = await SpecialPrice.create({
        price,
        startDate,
        endDate,
        userId,
        productId
    });
    return res.status(201).json(specialPrice);
});

// Actualizar un precio especial existente
const updateSpecialPrice = catchError(async (req, res) => {
    const { id } = req.params;
    const [updatedRows] = await SpecialPrice.update(req.body, { where: { id } });
    if (updatedRows === 0) return res.sendStatus(404); // Si no se actualiza ningún precio especial, devolver 404
    const updatedSpecialPrice = await SpecialPrice.findByPk(id);
    return res.json(updatedSpecialPrice);
});


const getProductPrice = catchError(async (req, res) => {
    const { userId, nombre_producto } = req.params;
    
    // Buscar el producto por su nombre
    const product = await Product.findOne({
        where: { name: nombre_producto }
    });

    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    let specialPrice = product.price; // Precio base

    // Buscar si hay un precio especial para el usuario y la marca del producto
    const specialPriceRecord = await SpecialPrice.findOne({
        where: {
            userId: userId,
            product_id: product.id // Suponiendo que tengas una tabla que relaciona precios especiales con productos
        }
    });

    if (specialPriceRecord) {
        specialPrice = specialPriceRecord.price; // Si se encuentra un precio especial, actualizar el precio especial
    }

    // Devolver el precio especial o el precio base si no hay precio especial
    return res.json({ specialPrice });
});



// Obtener precios especiales para un usuario y producto específicos
const getSpecialPrice = catchError(async (req, res) => {
    const { userId, productId } = req.query;
    const where = {}
    if(userId) where.userId = userId;
    if(productId) where.productId = productId;
    const specialPrice = await SpecialPrice.findAll({
        include: [User, Product],
        where: where
    });
    if (!specialPrice) return res.sendStatus(404); // Si no se encuentra un precio especial para el usuario y producto, devolver 404
    return res.json(specialPrice);
});

// Eliminar un precio especial por su ID
const deleteSpecialPrice = catchError(async (req, res) => {
    const { id } = req.params;
    await SpecialPrice.destroy({ where: { id } });
    return res.sendStatus(204);
});

const setSpecialUser = catchError(async(req, res) => {
    const { id } = req.params;
    const specialPrice = await SpecialPrice.findByPk(id);
    if(!specialPrice) await res.status(404).json({message: "specialPrice not found"});
    await specialPrice.setUser(req.body);
    const user = await specialPrice.getUser();
    return res.json(user);
});


module.exports = {
    createSpecialPrice,
    updateSpecialPrice,
    setSpecialUser,
    getSpecialPrice,
    getProductPrice,
    deleteSpecialPrice
};
