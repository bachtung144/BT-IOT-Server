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
    client.subscribe('state')
    client.publish('list', JSON.stringify([1,2,3,4,5]))
})

client.on('message', (topic, message) => {
    switch (topic) {
        case 'state':
            return handleList(message)

    }
    console.log('No handler for topic %s', topic)
})

const handleList = (message) => {
    console.log('mess from',message.toString())
    if (message.toString() === 'listDevice') {
        client.publish('list', JSON.stringify([1,2,3,4]))
    }
}



app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

app.listen(env.PORT || 5000, function(){
    console.log('now listening port:' + env.PORT);
});