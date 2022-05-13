const Building = require("../../models/building");

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

exports.delete = async (req, res) => {
    let id = req.params.id;
    const building = await Building.deleteOne({_id: id})
    if (building) await findAllBuilding(res)
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
