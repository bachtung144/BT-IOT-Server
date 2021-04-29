const express   = require('express');
const bodyParser= require('body-parser');
const env       = require('./env.json');
const cors      = require('cors');
const mqtt = require('mqtt');
const mongoose = require('mongoose')
const listDevice = require('./app/models/listDevice') //get to database
const client = mqtt.connect('mqtt://broker.hivemq.com')

const app = express();
app.use(cors());
app.use(bodyParser.json());


const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: "BT_IOT"
}

mongoose.connect(env.MONGODB,connectionParams)
    .then( (db) => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


client.on('connect', () => {
    client.subscribe('list')
    client.subscribe('control')
    getListDevice()
})

getListDevice = () => {
    listDevice.find({}).then(
        data => {
            client.publish('list',JSON.stringify(data));
        }
    ).catch(err =>   client.publish('list',JSON.stringify(err)))
}

client.on('message', (topic, message) => {
    switch (topic) {
        case 'control':
            return handleList(message)
    }
    console.log('No handler for topic %s', topic)
})

const handleList = (message) => {
    let mess = JSON.parse(message.toString());
    // console.log('123',typeof(mess))
    if (mess !== 200) {
        var myQuery = { id: mess?.id, room: mess?.room };
        var newValue = { $set: { status:mess?.status } };
        listDevice.updateOne(myQuery,newValue,(err,res) => {
            if (err) console.log(err);
            getListDevice();
        })
    }
}

app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

app.listen(env.PORT || 5000, function(){
    console.log('now listening port:' + env.PORT);
});
