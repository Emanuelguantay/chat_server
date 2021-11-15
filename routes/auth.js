/**
 * path: api/login
 */
const { Router, response} = require('express');
const { check } = require('express-validator');

const { createUser, login } = require('../controllers/auth');
const { validateField } = require('../middlewares/validate-field');

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

module.exports = router;