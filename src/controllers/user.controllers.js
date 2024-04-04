const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { firstName, lastName, specialPriceId } = req.body;
    const result = await User.create({
        firstName,
        lastName, 
        specialPriceId

    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const resultado = await User.update(
        {firstName, lastName },
        { where: {id}, returning: true }
    );
    if(resultado[0] === 0) return res.sendStatus(404);
    return res.json(resultado[1][0]);
});



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
}