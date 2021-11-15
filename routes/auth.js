/**
 * path: api/login
 */
const { Router, response} = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { validateField } = require('../middlewares/validate-field');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new',[
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'Contraseña es obligatoria').not().isEmpty(),
    validateField,
    
] ,createUser);

router.post('/',[
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'Contraseña es obligatoria').not().isEmpty(),
    validateField,
    
] ,login);

router.get('/renew', validateJWT, renewToken);


module.exports = router;