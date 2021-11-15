const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req = request, resp = response) => {

    const { email, password } = req.body;

    try {
        const existEmail = await User.findOne({email});
        if (existEmail){
            return resp.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado'
            });
        }

        const user = new User(req.body);

        //Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar JWT
        const token = await generateJWT(user.id);
        
        resp.json({
            ok: true,
            // msg: 'Crear usuario!!!'
            //body: user
            user,
            token
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