const Device = require('../../models/device')
const mqtt = require('mqtt');

function prgMqtt() {
    prgMqtt.client = mqtt.connect('mqtt://broker.hivemq.com:1883')

    prgMqtt.client.on('connect', () => {
        prgMqtt.client.subscribe('IoT47_MQTT_Test')
    })
}

exports.updateDevice = (req,res, next) => {
    prgMqtt()
    let {deviceId} = req.params
    let myQuery = { _id: deviceId};
    let {status} = req.body
    let newValue = { $set: { status:status } };

    Device.findOneAndUpdate(
        myQuery,
        newValue,
        {new: true, useFindAndModify: false},
        (err, doc) => {
            if (err) {
                res.send({
                    msg: "failed"
                })
            }
            Device.find({id_room: doc?.id_room }, (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    if (deviceId === '627b597cf0a3d2b52ab05b35')
                        prgMqtt.client.publish('IoT47_MQTT_Test', JSON.stringify(status))
                    else console.log('not connect esp 8266')
                    res.send({
                        msg: "success",
                        devices: result
                    });
                }
            })
        }
    )
}
