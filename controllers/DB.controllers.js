const client = require('../database/client.DB');


//Se necesitan pasar TODOS los parametros...
//Get from DB
const selectDB = async (a, b, c, d, e) => {

    const text = `SELECT ${a}, ${b}, ${c}, ${d}, ${e} FROM users;`
    let dbRes;

    return dbRes = await client.query(text);
}

//Save in DB
const insertDB = async (a, b, c, d, e) => {

    const text = 'INSERT INTO users(name, surname, email, age, password) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [a, b, c, d, e];

    try {
        return dbRes = await client.query(text, values);
    } catch (err) {
        throw new Error(err)
    }
}


module.exports = {
    selectDB,
    insertDB
}