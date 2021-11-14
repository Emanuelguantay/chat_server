/**
 * path: api/login
 */
const { Router, response} = require('express');
const { check } = require('express-validator');

const { createUser } = require('../controllers/auth');
const { validateField } = require('../middlewares/validate-field');

const router = Router();

router.post('/new',[
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    check('email', 'Email es obligatorio').not().isEmail(),
    check('password', 'Contraseña es obligatoria').isEmpty(),
    validateField,
    
] ,createUser);

module.exports = router;