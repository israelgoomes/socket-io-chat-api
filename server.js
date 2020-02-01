'use strict'

const app = require('./bin/express');
const http = require('http').Server(app);
const variables = require('./bin/configurations/variables');
const io = require('socket.io')(http);


app.get('/', ()=>{
    console.log('teste')
    io.on("connection", socket =>{
        console.log("USUARIO CONECTADO!");
        socket.on("user-connected", user =>{
    //             //setando secket.user no user que vem do front
                socket.user = user;
    //             broadcast emite a informação apenas para os usuários que estão se conectando com excessão de você mesmo
    //             o io.emit envia o evento para todos sockets conectados, já p broadcast,emit envia o evento para todos socketz conectados 
    //             menos ele mesmo. E o socket.emit envia apenas para o usuário conectado no momento
                socket.broadcast.emit("users-changed", { user: user, event: "connected" });
        });
        
        socket.on("message", data=>{
            io.emit("message", data);
        });
    
        socket.on("disconnect", ()=>{
            io.emit("users-changed", { user: socket.user, event: "disconnected" });
        });
    });
        })


http.listen(variables.Api.port, () =>{
    console.info("Api Nova Design inicializado com sucesso!");
});