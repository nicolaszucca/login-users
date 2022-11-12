const express = require('express');
const cors = require('cors');
const session = require('express-session');

const DataBase = require('./DB');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.path = '';

        //Start DB
        this.conectDB();

        //Start middlewares
        this.middlewares();

        //Start routes
        this.routes();
    }

    conectDB() {
        const db = new DataBase();
    }

    middlewares() {
        //urlendoded ---> para capturar datos del form y no tener errores 
        this.app.use(express.urlencoded({ extended: false }));

        //Start cors
        this.app.use(cors());

        //Parse req body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('views'));
        this.app.set('view engine', 'ejs');

        //Start express-sessions
        this.app.use(session({
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false,
        }));
    }

    routes() {
        this.app.use(this.path, require('../routes/user.routes'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}




module.exports = Server