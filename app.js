const express = require('express');
const socket = require('socket.io');
const http = require('http');
const {Chess} = require('chess.js');
const path = require('path');
const { title, disconnect } = require('process');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();

let players = {};
var currentPlayer = 'w';

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.render("index",{title:"Chess Game"});
})
// socket - unique connection jo har user ke liye banta hai
io.on("connection",(uniquesocket)=>{
    console.log("New user connected: " + uniquesocket.id);
    if(!players.white){
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole","w"); // yeh event us person ke lie hai jo abhi connect hua hai
        // ye bata raha hai ki user white se khel raha hai
    }
    else if(!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole","b");
    }
    else{
        uniquesocket.emit("spectatorRole");
    }

    // agar koi game chodke chale jaata hai toh
    uniquesocket.on("disconnect",()=>{
        if(uniquesocket.id === players.white){
            delete players.white;
        }
        else if(uniquesocket.id === players.black){
            delete players.black;
        }
    })

    uniquesocket.on("move",(move)=>{
        try{
            // check karo ki sahi player ki turn hai ki nahi
            if(chess.turn()==='w' && uniquesocket.id !=players.white) return;
            if(chess.turn()==='b' && uniquesocket.id!=players.black) return;

            // update the state if right players plays the turn
            const result = chess.move(move);// this line can crash your server as till now we havent validate the move which user is running is right or not
            if(result){
                currentPlayer = chess.turn();
                io.emit("move",move);/// frontend will show now
                io.emit("boardState",chess.fen()); // this wil show chess current state
            }
            else{
                console.log("Invalid move",move);
                uniquesocket.emit("intvalidMove",move);
            }

        }
        catch(err){
            console.log(err);
            uniquesocket.emit("Invalid move : ",move);
        }
    })
})

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
