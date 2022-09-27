const bcrypt = require('bcryptjs');
const { selectDB, selectWhereEmail } = require('../controllers/DB.controllers');

//TODO: modularizar regex
//REGISTER
//Unique email from DB
const isUniqueEmail = async (email) => {

    let emails = await selectDB();

    emails.rows.forEach(userEmail => {
        if (userEmail.email === email) {
            throw new Error(`The email: "${email}" is alredy registered`);
        }
    });
};

//Age validation
const isValidAge = (age) => {
    const ageRegex = /^[1-9][0-9]$/; //Regex (1-99)

    //Age exists, must be a number and greater than 16
    if (!age) { throw new Error('You must set an age') };
    if (typeof (age) !== 'number') { throw new Error('You must set a number') };
    if (age < 16) { throw new Error('You must be over 16 years old') };

    const validAge = ageRegex.test(age);
    if (!validAge) { throw new Error('Your age must be between 16 and 99') };

    return true;
};

//Password validation
const isValidPassword = (password, req) => {
    let userName = req.body.name;
    let userSurame = req.body.surname;
    let userEmail = req.body.email;

    //Password: lowercase, uppercase, number, special character, min: 8, max: 25
    const digitPassRegex = /[0-9]/;
    const specialCRegex = /[!@#$%^&*]/;
    const upperAndlowerRegex = /(?=.*[a-z])(?=.*[A-Z])/;

    //Password exist & password length 
    if (!password) { throw new Error('You must set a password') };
    if (password.length < 8) { throw new Error('the password must have at least 8 characters') };
    if (password.length > 25) { throw new Error('the password must be 25 characters or less') };
    if (userName === password) { throw new Error('The password must be different from the name') };
    if (userSurame === password) { throw new Error('The password must be different from the surname') };
    if (userEmail === password) { throw new Error('The password must be different from the email') };

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
};

//Name validation
const isValidName = (name) => {
    const specialCRegex = /(?=.*[!@#$%^&*])/;
    const firstLetterRegex = /^[a-zA-Z]/;

    if (!name) { throw new Error('You must set a name') };
    if (name.length > 50) { throw new Error('Name must be less than 50 characters') };

    //special caracters validation
    const validspecialCRegex = specialCRegex.test(name);
    if (validspecialCRegex) { throw new Error('Name must not contain special characters') }

    const validFirstLetter = firstLetterRegex.test(name);
    if (!validFirstLetter) { throw new Error('The name must start with a letter') }

    return true;
};

//Surname validation
const isValidSurname = (surname) => {
    const numbersRegex = /\d/;
    const specialCRegex = /(?=.*[!@#$%^&*])/;
    const firstLetterRegex = /^[a-zA-Z]/;

    if (!surname) { throw new Error('You must set a surname') };
    if (surname.length > 50) { throw new Error('Surname must be less than 50 characters') };

    const validspecialCRegex = specialCRegex.test(surname);
    if (validspecialCRegex) { throw new Error('Surname must not contain special characters') };

    const validFirstLetter = firstLetterRegex.test(surname);
    if (!validFirstLetter) { throw new Error('The surname must start with a letter') };

    const validNumber = numbersRegex.test(surname);
    if (validNumber) { throw new Error('The surname must not contain a number') };

    return true;
};

//LOGIN
//Email exist in DB
const emailInDB = async (email) => {
    const user = await selectWhereEmail(email);

    if (user.rows.length == 0) { throw new Error('Email not registered') };

    return true;
};

//Compare password's user
const isSamePassword = async (password, req) => {
    const email = req.body.email;
    const user = await selectWhereEmail(email);

    if (user.rows.length == 0) { throw new Error('Email not exist') }
    if (!await bcrypt.compare(password, user.rows[0].password)) {
        throw new Error('Contraseña incorrecta');
    }

    return true;
};


module.exports = {
    isValidName,
    isValidSurname,
    isUniqueEmail,
    isValidAge,
    isValidPassword,
    emailInDB,
    isSamePassword
}