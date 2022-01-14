const Building = require("../../models/building");

exports.getAll = (req,res) => {
    Building.find({})
        .then(building => {
            if (building) {
                res.status(200).send({data: building})
            }
            else res.status(404).send({err: 'not found'})
        }).catch( err => res.status(500).send({err: err}))
}

exports.update = (req,res) => {
    let id = req.params.id;
    let {name, address, location, city, district} = req.body
    let data = {name, address, location, city, district}
    Building.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, (err, doc) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else {
            Building.find({})
                .then(building => {
                    if (building) {
                        res.status(200).send({data: building})
                    }
                    else res.status(404).send({err: 'not found'})
                }).catch( err => res.status(500).send({err: err}))
        }
    });
}
exports.delete = (req,res) => {
    let id = req.params.id;
    Building.deleteOne({_id: id}).then(
        (data) => {
            if (data) {
                Building.find({})
                    .then(building => {
                        if (building) {
                            res.status(200).send({data: building})
                        }
                        else res.status(404).send({err: 'not found'})
                    }).catch( err => res.status(500).send({err: err}))
            }
            else {
                res.status(500).send({err: 'not delete'})
            }
        }
    ).catch( err => res.status(500).send({err: err}))
}

exports.addNew = (req,res) => {
    let {name, address, location, city, district} = req.body
    let data = {name, address, location, city, district}
    let building1 = new Building(data)
    building1.save((err) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else {
            Building.find({})
                .then(building => {
                    if (building) {
                        res.status(200).send({data: building})
                    }
                    else res.status(404).send({err: 'not found'})
                }).catch( err => res.status(500).send({err: err}))
        }
    })
}
