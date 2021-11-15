const express   = require('express');
const bodyParser= require('body-parser');
const env       = require('./env.json');
const cors      = require('cors');
const mongoose = require('mongoose')
const listDevice = require("./app/models/device");

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
    const getListDevice = () =>{
        listDevice.find({})
            .then(devices => {
                if (!devices) socket.emit('Server-list-devices', JSON.stringify([]))
                else socket.emit('Server-list-devices', JSON.stringify(devices))
            }).catch(err => socket.emit('Server-list-devices', err))
    }

    socket.on("Client-list-devices", function(data)
    {
        getListDevice()
    });

    socket.on("Client-control-device", function(data){
        let convert = JSON.parse(data.toString());
        let {idRoom,idDevice} = convert
        let myQuery = { _id: idDevice, id_room: idRoom };
        let newValue = { $set: { status:convert?.status } };
        listDevice.updateOne(myQuery,newValue,(err,res) => {
            if (err) console.log(err);
            getListDevice()
        })
    })
});
