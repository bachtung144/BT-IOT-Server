const express   = require('express');
const bodyParser= require('body-parser');
const env       = require('./env.json');
const cors      = require('cors');
const mqtt = require('mqtt');
const mongoose = require('mongoose')
const listDevice = require('./app/models/listDevice') //get to database

const app = express();
app.use(cors());
app.use(bodyParser.json());


const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(env.MONGODB,connectionParams)
    .then( (db) => {
        console.log('Connected to database ')
        getListDevice()
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

getListDevice = () => {
    listDevice.find({}).then(
        data => {
            console.log('123',data)
        }
    ).catch(err =>  console.log(err))
}

app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

app.listen(env.PORT || 5000, function(){
    console.log('now listening port:' + env.PORT);
});
