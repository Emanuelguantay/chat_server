const { response } = require('express');
const { validationResult } = require('express-validator');

const createUser = (req, resp = response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return resp.status(400).json({
            ok: false,
            msg: errors.mapped()
        });
    }
    resp.json({
        ok: true,
        msg: 'Crear usuario!!!'
    });
}

module.exports = {
    createUser
}