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
        else await findApartment(res, {building_id: doc.building_id})
    });
}

exports.addNew = (req,res) => {
    let {address, building_id} = req.body
    let data = {address, building_id}
    let apart1 = new Apartment(data)
    apart1.save(async (err) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else await findApartment(res, {building_id: building_id})
    })
}

exports.delete = async (req,res) => {
    let id = req.params.id;
    let buildingId = await Apartment.findById(id, 'building_id')
    let roomIds = await Room.find({apartment_id: id}, '_id')
    let tmpRoomIds = roomIds.map(item => item?._id)

    const apartment = await Apartment.deleteOne({_id: id})
    await User.deleteMany({apartment_id: id})
    await Room.deleteMany({apartment_id: id})

    if (tmpRoomIds !== []) await Device.deleteMany({room_id: {$in: tmpRoomIds}})

    if (apartment) {await findApartment(res, {building_id: buildingId?.building_id})}
    else res.status(500).send({err: 'delete error'})
}

