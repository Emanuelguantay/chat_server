const { request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res, next)=> {
    const token = req.header('x-token');

    if ( !token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en al peticion'
        });
    }
    console.log(token);

    try {

        const uid = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
    
}

module.exports = {
    validateJWT
}