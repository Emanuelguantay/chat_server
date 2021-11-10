const { Console } = require('console');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config()

const dbConnection = async() =>{
    try{
        const url = process.env.DB_CNN
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
            //Aprtir de Mongoose 6.0 no es necesario es true por default  
        })

        console.log('DB ONLINE')
    }catch(e){
        console.log(e);
        //throw new Error('Error en la base de datos');
    }

}

module.exports = {
    dbConnection
}