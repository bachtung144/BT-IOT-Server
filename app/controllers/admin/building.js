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
    let {name, address, city, district} = req.body
    let data = {name, address, city, district}
    Building.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, async (err, doc) => {
        if (err) res.status(500).send({err: err})
        else await findAllBuilding(res)
    });
}

exports.delete = async (req, res, next) => {
    let id = req.params.id;
    let apartIds = await Apartment.find({building_id: id},'_id')
    let tmpApartIds = apartIds.map(item => item?._id)
    let roomIds = await Room.find({apartment_id: {$in: tmpApartIds}}, '_id')
    let tmpRoomIds = roomIds.map(item => item?._id)


    const building = await Building.deleteOne({_id: id})
    const apartment = await Apartment.deleteMany({building_id: id})
    if (tmpApartIds !== []) {
        await User.deleteMany({apartment_id: {$in: tmpApartIds}})
        await Room.deleteMany({apartment_id: {$in: tmpApartIds}})
    }
    if (tmpRoomIds !== []) await Device.deleteMany({room_id: {$in: tmpRoomIds}})

    if (building && apartment ) await findAllBuilding(res)
    else res.status(500).send({err: 'delete error'})
}

exports.addNew = (req,res) => {
    let {name, address, city, district} = req.body
    let data = {name, address, city, district}
    let building1 = new Building(data)
    building1.save(async (err) => {
        if (err) res.status(500).send({err: err})
        else await findAllBuilding(res)
    })
}
