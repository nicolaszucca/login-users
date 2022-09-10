const { check } = require('express-validator');
const express = require('express');

const validarCampos = require('../middlewares/field-validation')
const { usersGet, usersPost, sendRegister, sendLogin } = require('../controllers/user.controllers');
const { isValidAge, isValidPassword, isValidEmail } = require('../helpers/validations');


const router = express.Router();



router.get('/get', usersGet);

router.post('/register', [
    check('email', 'Invalid email').isEmail(),
    check('email').custom(email => isValidEmail(email)),
    check('password',).custom((pass, { req }) => isValidPassword(pass, req)),
    check('age').custom(age => isValidAge(age)),
    validarCampos
], usersPost);



//Static content
router.get('/register', sendRegister);
router.get('/login', sendLogin);




module.exports = router;