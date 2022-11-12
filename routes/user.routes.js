const { check } = require('express-validator');
const express = require('express');

const validarCampos = require('../middlewares/field-validation')
const { sendLogin, sendRegister, sendHome, usersGet, userLogin, usersPost, userLogOut } = require('../controllers/user.controllers');
const { isValidAge, isValidPassword, isUniqueEmail, isValidName, isValidSurname, emailInDB, isSamePassword } = require('../helpers/validations');


const router = express.Router();


router.post('/login', [
    check('email', 'Invalid email').isEmail(),
    check('email').custom(email => emailInDB(email)),
    check('password').custom((password, { req }) => isSamePassword(password, req)),
    validarCampos
], userLogin);

router.post('/register', [
    check('email', 'Invalid email').isEmail(),
    check('email').custom(email => isUniqueEmail(email)),
    check('password',).custom((pass, { req }) => isValidPassword(pass, req)),
    check('age').custom(age => isValidAge(age)),
    check('name').custom(name => isValidName(name)),
    check('surname').custom(surname => isValidSurname(surname)),
    validarCampos
], usersPost);

router.get('/logout', userLogOut);


//Static content
router.get('/', sendLogin);
router.get('/register', sendRegister);
router.get('/home', sendHome);




module.exports = router;