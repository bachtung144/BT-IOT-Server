const mqtt = require('mqtt');
const listDevice = require('../app/models/listDevice') //get to database

function prgMqtt() {
    prgMqtt.client = mqtt.connect('ws://test.mosquitto.org:8080/ws')

    prgMqtt.client.on('connect', () => {
        prgMqtt.client.subscribe('getListDevice')
        prgMqtt.client.subscribe('controlDevice')
    })

    prgMqtt.client.on('message', (topic, message) => {
        switch (topic) {
            case 'getListDevice':
                return handleListDevice(message)
            case 'controlDevice':
                return handleControlDevice(message)
        }
        console.log('No handler for topic %s', topic)
    })
}

getListDeviceByIdRoom = (idRoom) => {
    listDevice.find({id_room:idRoom})
        .then(devices => {
            if (!devices) prgMqtt.client.publish('listDevice',JSON.stringify('notFound'))
            else prgMqtt.client.publish('listDevice',JSON.stringify(devices))
        }).catch(err => prgMqtt.client.publish('listDevice',JSON.stringify('notFound')))
}

const handleListDevice = (message) => {
    let mess = JSON.parse(message.toString());
    if (mess !== 200) {
        let {idRoom} = mess
        getListDeviceByIdRoom(idRoom)
    }
}

const handleControlDevice = (message) => {
    let mess = JSON.parse(message.toString());
    if (mess !== 200) {
        let {idRoom,idDevice} = mess
        let myQuery = { _id: idDevice, id_room: idRoom };
        let newValue = { $set: { status:mess?.status } };
        listDevice.updateOne(myQuery,newValue,(err,res) => {
            if (err) console.log(err);
            getListDeviceByIdRoom(idRoom);
        })
    }
}

exports.prgMqtt = prgMqtt;
