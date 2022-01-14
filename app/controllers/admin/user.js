const User = require("../../models/user");

exports.getByIdApart = (req,res) => {
    User.find(req.query)
        .then(data => {
            if (data) {
                res.status(200).send({data: data})
            }
            else res.status(404).send({err: 'not found'})
        }).catch( err => res.status(500).send({err: err}))
}

exports.update = (req,res) => {
    let id = req.params.id;
    let {phone, type} = req.body
    let data = {phone, type}
    User.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, (err, doc) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else {
            User.find({id_apartment: doc.id_apartment})
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
    let {phone, password, type, id_apartment} = req.body
    let data = {phone, password, type, id_apartment}
    let user1 = new User(data)
    user1.save((err) => {
        if (err) {
            res.status(500).send({err: err})
        }
        else {
            User.find({id_apartment: id_apartment})
                .then(data => {
                    if (data) {
                        res.status(200).send({data: data})
                    }
                    else res.status(404).send({err: 'not found'})
                }).catch( err => res.status(500).send({err: err}))
        }
    })
}
