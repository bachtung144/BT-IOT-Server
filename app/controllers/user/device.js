const Device = require('../../models/device')
const Chip = require('../../models/chip')
const mqtt = require('mqtt');

function prgMqtt() {
    prgMqtt.client = mqtt.connect('mqtt://broker.hivemq.com:1883')

    prgMqtt.client.on('connect', () => {
        prgMqtt.client.subscribe('IoT_MQTT_Control')
    })
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
                            prgMqtt.client.publish('IoT_MQTT_Control',
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

// exports.updateDevice = async (req,res, next) => {
//     prgMqtt()
//     let {deviceId} = req.params
//     let myQuery = { _id: deviceId};
//     let {status} = req.body
//     let device = await Device.findOne(myQuery)
//     let chip = await Chip.findOne({esp_id: device?.input?.esp_id})
//     if (device && chip) {
//         prgMqtt.client.publish('IoT_MQTT_Test',
//             JSON.stringify(
//                 {chipId: chip?.esp_id,
//                     gpio: chip?.list_gpio?.find(data => data.id === device?.input?.gpio_id).value,
//                     status: status}
//             ))
//     }else  {
//         res.send({msg: 'Thiết bị này chưa được kết nối'})
//         return;
//     }
//     prgMqtt.client.on('message', async (topic, message) => {
//         let tmp_buffer = message.toString();
//         console.log(tmp_buffer)
//         if (topic === 'Client_IoT_MQTT_Test' && (tmp_buffer === '0' || tmp_buffer === '1')){
//             try {
//                 let esp_status = Number(tmp_buffer);
//                 let newValue = { $set: { status:esp_status } };
//                 let update = await Device.findOneAndUpdate(myQuery, newValue, {new: true, useFindAndModify: false})
//                 let devices = await Device.find({room_id: update?.room_id })
//                 if (devices) res.send({msg: "success", devices: devices});
//                 else  res.send({msg: 'Thiết bị này chưa được kết nối'})
//                 await prgMqtt.client.end();
//             }
//             catch (err) {next(err)}
//         }else  {
//             res.send({msg: 'Thiết bị này chưa được kết nối'})
//             prgMqtt.client.end();
//         }
//     })
// }

