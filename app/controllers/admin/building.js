const Building = require("../../models/building");
const Apartment = require("../../models/apartment");
const Room = require("../../models/room");
const User = require("../../models/user");
const Device = require("../../models/device");

const findAllBuilding = async (res) => {
    const building = await Building.find({})
    if (building) res.status(200).send({data: building})
    else res.status(404).send({err: 'not found'})
}

exports.getAll = async (req, res) => {
    await findAllBuilding(res)
}

exports.update = (req,res) => {
    let id = req.params.id;
    let {name, address, location, city, district} = req.body
    let data = {name, address, location, city, district}
    Building.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, async (err, doc) => {
        if (err) res.status(500).send({err: err})
        else await findAllBuilding(res)
    });
}

exports.delete = async (req, res, next) => {
    let id = req.params.id;
    let apartIds = await Apartment.find({id_building: id},'_id')
    let tmpApartIds = apartIds.map(item => item?._id)
    let roomIds = await Room.find({id_apartment: {$in: tmpApartIds}}, '_id')
    let tmpRoomIds = roomIds.map(item => item?._id)


    const building = await Building.deleteOne({_id: id})
    const apartment = await Apartment.deleteMany({id_building: id})
    if (tmpApartIds !== []) {
        await User.deleteMany({id_apartment: {$in: tmpApartIds}})
        await Room.deleteMany({id_apartment: {$in: tmpApartIds}})
    }
    if (tmpRoomIds !== []) await Device.deleteMany({id_room: {$in: tmpRoomIds}})

    if (building && apartment ) await findAllBuilding(res)
    else res.status(500).send({err: 'delete error'})
}

exports.addNew = (req,res) => {
    let {name, address, location, city, district} = req.body
    let data = {name, address, location, city, district}
    let building1 = new Building(data)
    building1.save(async (err) => {
        if (err) res.status(500).send({err: err})
        else await findAllBuilding(res)
    })
}
