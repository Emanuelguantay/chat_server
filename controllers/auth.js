const { response } = require('express');


const createUser = (req, resp = response) => {
    
    resp.json({
        ok: true,
        msg: 'Crear usuario!!!'
    });
}

module.exports = {
    createUser
}