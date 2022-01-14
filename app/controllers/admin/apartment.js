const Apartment = require("../../models/apartment");

exports.getByIdBuilding = (req,res) => {
    Apartment.find(req.query)
        .then(data => {
            if (data) {
                res.status(200).send({data: data})
            }
            else res.status(404).send({err: 'not found'})
        }).catch( err => res.status(500).send({err: err}))
}

exports.update = (req,res) => {
    let id = req.params.id;
    let {address} = req.body
    let data = {address}
    Apartment.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, (err, doc) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else {
            Apartment.find({id_building: doc.id_building})
                .then(data => {
                    if (data) {
                        res.status(200).send({data: data})
                    }
                    else res.status(404).send({err: 'not found'})
                }).catch( err => res.status(500).send({err: err}))
        }
    });
}

exports.delete = (req,res) => {
    let id = req.params.id;
    Apartment.findById(id)
        .then(apartment => {
            if (apartment) {
                let tmp = apartment.id_building
                Apartment.deleteOne({_id: id}).then(
                    (data) => {
                        if (data) {
                            Apartment.find({id_building: tmp})
                                .then(data => {
                                    if (data) {
                                        res.status(200).send({data: data})
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
        }).catch( err => res.status(500).send({err: err}))
}

exports.addNew = (req,res) => {
    let {address, id_building} = req.body
    let data = {address, id_building}
    let apart1 = new Apartment(data)
    apart1.save((err) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else {
            Apartment.find({id_building: id_building})
                .then(data => {
                    if (data) {
                        res.status(200).send({data: data})
                    }
                    else res.status(404).send({err: 'not found'})
                }).catch( err => res.status(500).send({err: err}))
        }
    })
}

