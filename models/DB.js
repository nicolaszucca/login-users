const client = require('../database/client.DB');


class DataBase {
    constructor() {
        this.client = client.connect();
    }


    saveInDataBase(user) {
        client.query('SELECT NOW()', (err, res) => {
            console.log(err, res)
            client.end()
        })
    }
}









module.exports = DataBase