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
        else await findRoom(res,{id_apartment: doc.id_apartment})
    });
}

exports.addNew = (req,res) => {
    let {name, id_apartment} = req.body
    let data = {name, id_apartment}
    let room1 = new Room(data)
    room1.save(async (err) => {
        if (err) res.status(500).send({err: err})
        else await findRoom(res,{id_apartment: id_apartment})
    })
}

exports.delete = async (req,res) => {
    let id = req.params.id;
    let roomId = await Room.findById(id, 'id_apartment')

    const room = await Room.deleteOne({_id: id})
    await Device.deleteMany({id_room: id})

    if (room) {await findRoom(res, {id_apartment: roomId?.id_apartment})}
    else res.status(500).send({err: 'delete error'})
}
