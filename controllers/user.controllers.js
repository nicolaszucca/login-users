const bcrypt = require('bcryptjs');
const { response, request } = require('express'); //Autollenado VSCode

const { selectDB, insertDB } = require('./DB.controllers');

//get
const usersGet = async (req = request, res = response) => {
    //SE NECESITAN TODOS LOS PARAMETROS POR EL MOMENTO....
    let dbRes = await selectDB("name", "surname", "email", "age", "password");

    res.send(dbRes.rows)
};

//post 
const usersPost = async (req = request, res = response) => {

    let { name, surname, email, age, password } = req.body

    //Encoding password
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    //Save in DB
    await insertDB(name, surname, email, age, password);

    //Response
    res.send({
        name,
        surname,
        email,
        age,
        password,
    });
}






//contenido estático 
const sendLogin = (req, res) => {
    res.render('login')
}
const sendRegister = (req, res) => {
    res.render('register')
}






module.exports = {
    usersGet,
    usersPost,
    sendRegister,
    sendLogin
}