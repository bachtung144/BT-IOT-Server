const express   = require('express');
const bodyParser= require('body-parser');
const env       = require('./env.json');
const cors      = require('cors');
const mongoose = require('mongoose')
const listDevice = require('./app/models/listDevice') //get to database
const mqtt = require('mqtt');
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
    client.subscribe('listDevice')
    client.subscribe('controlDevice')
    getListDevice()
})

getListDevice = () => {
    listDevice.find({}).then(
        data => {
            client.publish('listDevice',JSON.stringify(data));
        }
    ).catch(err =>   client.publish('listDevice',JSON.stringify(err)))
}

client.on('message', (topic, message) => {
    switch (topic) {
        case 'controlDevice':
            return handleList(message)
    }
    console.log('No handler for topic %s', topic)
})

const handleList = (message) => {
    let mess = JSON.parse(message.toString());
    if (mess !== 200) {
        let myQuery = { id: mess?.id, room: mess?.room };
        let newValue = { $set: { status:mess?.status } };
        listDevice.updateOne(myQuery,newValue,(err,res) => {
            if (err) console.log(err);
            getListDevice();
        })
    }
}
