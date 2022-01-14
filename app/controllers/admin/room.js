const Room = require("../../models/room");

exports.getByIdApart = (req,res) => {
    Room.find(req.query)
        .then(data => {
            if (data) {
                res.status(200).send({data: data})
            }
            else res.status(404).send({err: 'not found'})
        }).catch( err => res.status(500).send({err: err}))
}

exports.update = (req,res) => {
    let id = req.params.id;
    let {name} = req.body
    let data = {name}
    Room.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, (err, doc) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else {
            Room.find({id_apartment: doc.id_apartment})
                .then(data => {
                    if (data) {
                        res.status(200).send({data: data})
                    }
                    else res.status(404).send({err: 'not found'})
                }).catch( err => res.status(500).send({err: err}))
        }
    });
}

exports.addNew = (req,res) => {
    let {name, id_apartment} = req.body
    let data = {name, id_apartment}
    let room1 = new Room(data)
    room1.save((err) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else {
            Room.find({id_apartment: id_apartment})
                .then(data => {
                    if (data) {
                        res.status(200).send({data: data})
                    }
                    else res.status(404).send({err: 'not found'})
                }).catch( err => res.status(500).send({err: err}))
        }
    })
}

