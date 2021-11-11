const express = require('express');
//DB Config
const { dbConnection }=require('./database/config');
dbConnection();


const app = express();
const path = require('path');
require('dotenv').config();

// Lectura y Parseo de Body
app.use(express.json());

//Socket
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')


//Path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


// Mis Rutas
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (err) =>{
    if (err) throw new Error(err);

    console.log('Server corriendo en puerto!!', process.env.PORT);
});