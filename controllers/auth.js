const { response, request } = require('express');
const User = require('../models/user')

const createUser = async (req = request, resp = response) => {

    const { email } = req.body;

    try {
        const existEmail = await User.findOne({email});
        if (existEmail){
            return resp.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado'
            });
        }

        const user = new User(req.body);

        await user.save();
        
        resp.json({
            ok: true,
            // msg: 'Crear usuario!!!'
            body: user
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
}

module.exports = {
    createUser
}