const Device = require("../../models/device");
const Chip = require("../../models/chip");

const findDevice = async (res, query) => {
    const devices = await Device.find(query)
    if (devices) res.status(200).send({data: devices})
    else res.status(404).send({err: 'not found'})
}

exports.getByRoomId = async (req, res) => {
    const device = await Device.find(req.query)
    if (device) res.status(200).send({data: device})
    else res.status(404).send({err: 'not found'})
}

exports.update = (req,res) => {
    let id = req.params.id;
    let {name, input} = req.body
    let data = {name, input}
    Device.findOneAndUpdate({_id: id}, {$set:data},{new: false},async (err, doc) => {
        if (err) res.status(500).send({err: err})
        else {
            if (doc?.input?.esp_id !== input?.esp_id || doc?.input?.gpio_id !== input?.gpio_id){
                 Chip.findOneAndUpdate({esp_id: input?.esp_id},{$set:{"list_gpio.$[el].used": true}},
                    {arrayFilters: [{ "el.id": input?.gpio_id }], new: true}, (err, doc1) => {
                         console.log(doc1)
                     })
                 Chip.findOneAndUpdate({esp_id: doc?.input?.esp_id},{$set:{"list_gpio.$[el].used": false}},
                    {arrayFilters: [{ "el.id": doc?.input?.gpio_id }], new: true},(err, doc2) => {
                         console.log(doc2)
                     })
            }
            await findDevice(res, {id_room: doc.id_room})
        }
    });
}

exports.addNew = (req,res) => {
    let {name, id_room, input} = req.body
    let status = 0
    let data = {name, id_room, status, input}
    let tmpDevice = new Device(data)
    Chip.findOneAndUpdate({esp_id: input?.esp_id},{$set:{"list_gpio.$[el].used": true}},
        {arrayFilters: [{ "el.id": input?.gpio_id }], new: true},(err, doc) => {
            if (err) {
                res.status(500).send({err: err})
            }
            else {
                tmpDevice.save(async (err) => {
                    if (err) {
                        res.status(500).send({err: err})
                    }
                    else await findDevice(res, {id_room: id_room})
                })
            }
        })
}

exports.delete = async (req,res) => {
    let id = req.params.id;
    let deviceId = await Device.findById(id)
    let input = deviceId?.input
    Chip.findOneAndUpdate({esp_id: input?.esp_id},{$set:{"list_gpio.$[el].used": false}},
        {arrayFilters: [{ "el.id": input?.gpio_id }], new: true},async (err, doc) => {
            if (err) {
                res.status(500).send({err: err})
            }
            else {
                const device = await Device.deleteOne({_id: id})

                if (device) {await findDevice(res, {id_room: deviceId?.id_room})}
                else res.status(500).send({err: 'delete error'})
            }
        })
}

