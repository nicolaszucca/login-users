const bcrypt = require('bcryptjs');
const { response, request } = require('express'); //Autollenado VSCode

const { selectDB, insertDB, selectWhereEmail } = require('./DB.controllers');


//GET
//TODO: delete usersGet
const usersGet = async (req = request, res = response) => {
    //SE NECESITAN TODOS LOS PARAMETROS POR EL MOMENTO....
    let dbRes = await selectDB("name", "surname", "email", "age", "password");

    res.status(200).send(dbRes.rows);
};

//Login user POST
const userLogin = async (req, res) => {
    const { email } = req.body;
    const user = await selectWhereEmail(email);
    //TODO: req.sessions...
    res.status(200).send({ "msg": "Session start" });
};

//Register user POST
const usersPost = async (req = request, res = response) => {

    let { name, surname, email, age, password } = req.body
    //TODO: req.sessions...
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
    res.status(200).redirect("/users");
};






//contenido estático 
const sendIndex = (req, res) => {
    res.status(200).render('index');
};
const sendLogin = (req, res) => {
    res.status(200).render('login');
};
const sendRegister = (req, res) => {
    res.status(200).render('register');
};
const sendHome = (req, res) => {
    //TODO: req.sessions...
    res.status(200).render('home');
};






module.exports = {
    sendIndex,
    sendLogin,
    sendRegister,
    sendHome,
    usersGet,
    userLogin,
    usersPost,
    userLogOut,
}