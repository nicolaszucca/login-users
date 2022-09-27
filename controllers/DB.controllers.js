const client = require('../database/client.DB');


//Get from DB
const selectDB = async () => {

    const text = `SELECT "email" FROM users;`

    return await client.query(text);
}

//Save in DB
const insertDB = async (a, b, c, d, e) => {

    const text = 'INSERT INTO users(name, surname, email, age, password) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [a, b, c, d, e];

    try {
        return await client.query(text, values);
    } catch (err) {
        throw new Error(err);
    }
}

const selectWhereEmail = async (condition) => {
    const text = `SELECT "name", "surname", "email", "age", "password" FROM users WHERE email = '${condition}'`;

    try {
        return await client.query(text);
    } catch (error) {
        throw new Error(err);
    }
}

module.exports = {
    selectDB,
    insertDB,
    selectWhereEmail
}