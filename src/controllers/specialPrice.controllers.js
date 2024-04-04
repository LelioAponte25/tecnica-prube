const catchError = require('../utils/catchError');
const SpecialPrice = require('../models/SpecialPrice');

// Crear un nuevo precio especial
const createSpecialPrice = catchError(async (req, res) => {
    const specialPrice = await SpecialPrice.create(req.body);
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

// Obtener precios especiales para un usuario y producto específicos
const getSpecialPrice = catchError(async (req, res) => {
    const { user_Id, productId } = req.params;
    const specialPrice = await SpecialPrice.findOne({
        where: { user_Id, productId }
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

module.exports = {
    createSpecialPrice,
    updateSpecialPrice,
    getSpecialPrice,
    deleteSpecialPrice
};
