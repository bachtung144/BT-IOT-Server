const express   = require('express');
const bodyParser= require('body-parser');
const env       = require('./env.json');
const cors      = require('cors');
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

const app = express();

app.use(cors());
app.use(bodyParser.json());

client.on('connect', () => {
    client.subscribe('list')

    client.publish('list', JSON.stringify([1,2,3,4]))
})

app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

app.listen(env.PORT || 5000, function(){
    console.log('now listening port:' + env.PORT);
});