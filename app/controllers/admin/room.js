const Room = require("../../models/room");
const Device = require("../../models/device");

const findRoom = async (res, query) => {
    const room = await Room.find(query)
    if (room) res.status(200).send({data: room})
    else res.status(404).send({err: 'not found'})
}

exports.getByIdApart = async (req, res) => {
    await findRoom(res, req.query)
}

exports.update = (req,res) => {
    let id = req.params.id;
    let {name} = req.body
    let data = {name}
    Room.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, async (err, doc) => {
        if (err) res.status(500).send({err: err})
        else await findRoom(res,{apartment_id: doc.apartment_id})
    });
}

exports.addNew = (req,res) => {
    let {name, apartment_id} = req.body
    let data = {name, apartment_id}
    let room1 = new Room(data)
    room1.save(async (err) => {
        if (err) res.status(500).send({err: err})
        else await findRoom(res,{apartment_id: apartment_id})
    })
}

exports.delete = async (req,res) => {
    let id = req.params.id;
    let roomId = await Room.findById(id, 'apartment_id')

    const room = await Room.deleteOne({_id: id})
    await Device.deleteMany({room_id: id})

    if (room) {await findRoom(res, {apartment_id: roomId?.apartment_id})}
    else res.status(500).send({err: 'delete error'})
}
