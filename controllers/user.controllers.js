const bcrypt = require('bcryptjs');
const { response, request } = require('express'); //Autollenado VSCode

const { insertDB, selectWhereEmail } = require('./DB.controllers');


//Login user POST
const userLogin = async (req, res) => {
    const { email } = req.body;
    const user = await selectWhereEmail(email);

    req.session.name = user.rows[0].name;

    res.status(200).send({ "msg": "Session start" });
};

//Register user POST
const usersPost = async (req = request, res = response) => {

    let { name, surname, email, age, password } = req.body;

    req.session.name = name;

    //Encoding password
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    //Save in DB
    await insertDB(name, surname, email, age, password);

    //Response
    res.status(201).send({
        name,
        surname,
        email,
        age,
        password,
    });
};

const userLogOut = async (req, res) => {
    req.session.destroy();
    res.status(200).send({ "msg": "Session end" });
};






//contenido estático 
const sendLogin = (req, res) => {
    res.status(200).render('login');
};
const sendRegister = (req, res) => {
    res.status(200).render('register');
};
const sendHome = (req, res) => {
    const name = req.session.name;
    res.status(200).render('home', {
        name
    });
};






module.exports = {
    sendLogin,
    sendRegister,
    sendHome,
    userLogin,
    usersPost,
    userLogOut,
}