const Device = require("../../models/device");

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
    let {name} = req.body
    let data = {name}
    Device.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, async (err, doc) => {
        if (err) res.status(500).send({err: err})
        else await findDevice(res, {id_room: doc.id_room})
    });
}

exports.addNew = (req,res) => {
    let {name, id_room} = req.body
    let status = 0
    let data = {name, id_room, status}
    let tmpDevice = new Device(data)
    tmpDevice.save(async (err) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else await findDevice(res, {id_room: id_room})
    })
}

exports.delete = async (req,res) => {
    let id = req.params.id;
    let deviceId = await Device.findById(id, 'id_room')

    const device = await Device.deleteOne({_id: id})

    if (device) {await findDevice(res, {id_room: deviceId?.id_room})}
    else res.status(500).send({err: 'delete error'})
}

