const mongoose = require('mongoose');

const dbConnection = async() =>{
    try{
        console.log('INIT DB CONFIG')
    }catch(e){
        console.log(e);
        throw new Error('Error en la base de datos');
    }

}

module.exports = {
    dbConnection
}