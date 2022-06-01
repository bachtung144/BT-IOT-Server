const Apartment = require("../../models/apartment");
const Room = require("../../models/room");
const User = require("../../models/user");
const Device = require("../../models/device");

const findApartment = async (res, query) => {
    const apartment = await Apartment.find(query)
    if (apartment) res.status(200).send({data: apartment})
    else res.status(404).send({err: 'not found'})
}

exports.getByIdBuilding = async (req, res) => {
    await findApartment(res, req.query)
}

exports.update = (req,res) => {
    let id = req.params.id;
    let {address} = req.body
    let data = {address}
    Apartment.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, async (err, doc) => {
        if (err) res.status(500).send({err: err})
        else await findApartment(res, {id_building: doc.id_building})
    });
}

exports.addNew = (req,res) => {
    let {address, id_building} = req.body
    let data = {address, id_building}
    let apart1 = new Apartment(data)
    apart1.save(async (err) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else await findApartment(res, {id_building: id_building})
    })
}

exports.delete = async (req,res) => {
    let id = req.params.id;
    let buildingId = await Apartment.findById(id, 'id_building')
    let roomIds = await Room.find({id_apartment: id}, '_id')
    let tmpRoomIds = roomIds.map(item => item?._id)

    const apartment = await Apartment.deleteOne({_id: id})
    await User.deleteMany({id_apartment: id})
    await Room.deleteMany({id_apartment: id})

    if (tmpRoomIds !== []) await Device.deleteMany({id_room: {$in: tmpRoomIds}})

    if (apartment) {await findApartment(res, {id_building: buildingId?.id_building})}
    else res.status(500).send({err: 'delete error'})
}

