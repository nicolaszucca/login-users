const { selectDB } = require('../controllers/DB.controllers');

//Unique email from DB
const isValidEmail = async (email) => {

    let isUniqueEmail = await selectDB("name", "surname", "email", "age", "password");

    isUniqueEmail.rows.forEach(user => {
        if (user.email === email) {
            throw new Error(`The email: "${email}" is alredy registered`);
        }
    });
}

//Age validation
const isValidAge = (age) => {
    const ageRegex = /^[1-9][0-9]$/; //Regex (1-99)

    //Age exists, must be a number and greater than 16
    if (!age) { throw new Error('You must set an age') };
    if (typeof (age) !== 'number') { throw new Error('You must set a number') };
    if (age < 16) { throw new Error('You must be over 16 years old') };

    const validAge = ageRegex.test(age);
    if (!validAge) { throw new Error('your age must be between 16 and 99') };

    return true;
}

//Password validation
const isValidPassword = (password, req) => {
    let userName = req.body.name;
    let userSurame = req.body.surname;

    //Password: lowercase, uppercase, number, special character, min: 8, max: 25
    const digitPassRegex = /[0-9]/;
    const specialCRegex = /[!@#$%^&*]/;
    const upperAndlowerRegex = /[a-z][A-Z]/;

    //Password exist & password length 
    if (!password) { throw new Error('You must set a password') };
    if (password.length < 8) { throw new Error('the password must have at least 8 characters') };
    if (password.length > 25) { throw new Error('the password must be 25 characters or less') };
    if (userName === password) { throw new Error('The password must be different from the name') };
    if (userSurame === password) { throw new Error('The password must be different from the surname') };

    //Digit validation
    const validDigitRegex = digitPassRegex.test(password);
    if (!validDigitRegex) { throw new Error('The passwor must contain a digit') };

    //Special character validation
    const validSpecialCRegex = specialCRegex.test(password);
    if (!validSpecialCRegex) { throw new Error('The password must contain a special character') };

    //Uppercase & lowercase validation
    const validUpperAndLowerRegex = upperAndlowerRegex.test(password);
    if (!validUpperAndLowerRegex) { throw new Error('The password must contain uppercase and lowercase') };

    return true;
}





module.exports = {
    isValidEmail,
    isValidAge,
    isValidPassword,
}