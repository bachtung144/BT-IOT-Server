const express   = require('express');
const bodyParser= require('body-parser');
const env       = require('./env.json');
const cors      = require('cors');
const mongoose = require('mongoose')
const device = require("./app/models/device");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(require('./routes'));

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // dbName: "BT_IOT"
}

mongoose.connect(env.MONGODB,connectionParams)
    .then( (db) => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(3000);

io.on("connection", (socket) => {
    socket.on("disconnect", function()
    {
    });
    const getListDevice = (data) =>{
        device.find({id_room: data}) // sai
            .then(devices => {
                if (!devices) socket.emit('Server-list-device', JSON.stringify([]))
                else {
                    let left = devices.filter(item => item.location[1] === 1)
                    let middle = devices.filter(item => item.location[1] === 2)
                    let right = devices.filter(item => item.location[1] === 3)
                    if (right.length === 0) {
                        socket.emit('Server-list-device', JSON.stringify({
                            type: '2c',
                            left: left,
                            right: middle
                        }))
                    }
                else {
                        socket.emit('Server-list-device', JSON.stringify({
                            type: '3c',
                            left: left,
                            middle: middle,
                            right: right
                        }))
                    }
                }
            }).catch(err => socket.emit('Server-list-device', err))
    }

    socket.on("Client-list-device", function(data)
    {
        getListDevice(data)
    });

    socket.on("Client-control-device", function(data){
        let convert = JSON.parse(data.toString());
        let {idRoom,idDevice} = convert
        let myQuery = { _id: idDevice, id_room: idRoom };
        let newValue = { $set: { status:convert?.status } };
        device.updateOne(myQuery,newValue,(err,res) => {
            if (err) console.log(err);
            getListDevice(idRoom)
        })
    })
});
