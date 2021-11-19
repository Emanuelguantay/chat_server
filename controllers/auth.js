const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { validateField } = require('../middlewares/validate-field');
const jwt = require('jsonwebtoken');

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


const login = async (req = request, resp = response) => {

    const { email, password } = req.body;

    try {

        const user = new User(req.body);

        const userDB = await User.findOne({email});
        //Validar usuario
        if (!userDB) {
            return resp.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Validar password
        const validatePassword = bcrypt.compareSync(password, userDB.password);

        if (!validatePassword){
            return resp.status(400).json({
                ok: false,
                msg: 'Password no valida'
            });
        }

        //Generar JWT
        const token = await generateJWT(userDB.id);
        
        resp.json({
            ok: true,
            msg: 'Login',
            usuario: userDB,
            token
            //token
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
}

const renewToken = async (req = request, resp = response) => {

    //obtener uid
    const uid = req.uid;

    // obtener nuevo token
    console.log("tokenn")
    const token = await generateJWT(uid);

    const user = await User.findById(uid.uid);
    
    resp.status(500).json({
        ok: false,
        msg: 'renew',
        user,
        token
    });
}

module.exports = {
    createUser,
    login,
    renewToken
}