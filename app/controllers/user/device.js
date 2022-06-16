const Device = require('../../models/device')
const Chip = require('../../models/chip')
const mqtt = require('mqtt');

function prgMqtt() {
    prgMqtt.client = mqtt.connect('mqtt://broker.hivemq.com:1883')

    prgMqtt.client.on('connect', () => {
        prgMqtt.client.subscribe('IoT_MQTT_Test')
    })

    // prgMqtt.client.on('message', (topic, message) => {
    //     console.log(topic, message)
    // })
}

exports.updateDevice = (req,res, next) => {
    prgMqtt()
    let {deviceId} = req.params
    let myQuery = { _id: deviceId};
    let {status} = req.body
    let newValue ={ $set: { status:status }}
    Device.findOneAndUpdate(
        myQuery,
        newValue,
        {new: true, useFindAndModify: false},
        (err, doc) => {
            if (err) res.send(err);
            Device.find({room_id: doc?.room_id }, (err, devices) => {
                if (err) res.send(err);
                 else {
                    Chip.findOne({esp_id: doc?.input?.esp_id}, (err, result) => {
                        if (err) res.send(err);
                        else {
                            prgMqtt.client.publish('IoT_MQTT_Test',
                                JSON.stringify(
                                    {chipId: result?.esp_id,
                                        gpio: result?.list_gpio?.find(data => data.id === doc?.input?.gpio_id).value,
                                        status: status}
                                ))
                            res.send({
                                msg: "success",
                                devices: devices
                            });
                        }
                    })
                }
            })
        }
    )
}
