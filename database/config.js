const mongoose = require('mongoose');

const dbConection = () =>{
    try{

    }catch(e){
        console.log(e);
        throw new Error('Error en la base de datos');
    }

}

module.exports = {
    dbConection
}