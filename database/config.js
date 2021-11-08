const { Console } = require('console');
const mongoose = require('mongoose');
const path = require('path');

const dbConnection = async() =>{
    try{
        
            await mongoose.connect("mongodb+srv://root:g2unCxkiXgAGZD18@cluster0.sohoq.mongodb.net/chat", {
            useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true
                
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