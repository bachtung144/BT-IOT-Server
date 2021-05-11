const mqtt = require('mqtt');
const listDevice = require('../app/models/listDevice') //get to database

function prgMqtt() {
    prgMqtt.client = mqtt.connect('mqtt://broker.hivemq.com')

    prgMqtt.client.on('connect', () => {
        prgMqtt.client.subscribe('list')
        prgMqtt.client.subscribe('control')
        getListDevice()
    })

    prgMqtt.client.on('message', (topic, message) => {
        switch (topic) {
            case 'control':
                return handleList(message)
        }
        console.log('No handler for topic %s', topic)
    })
}

const getListDevice = () => {
    listDevice.find({}).then(
        data => {
            prgMqtt.client.publish('list',JSON.stringify(data));
        }
    ).catch(err =>   prgMqtt.client.publish('list',JSON.stringify(err)))
}

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

exports.prgMqtt = prgMqtt;
