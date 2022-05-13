const User = require("../../models/user");

const findUser = async (res, query) => {
    const user = await User.find(query)
    if (user) res.status(200).send({data: user})
    else res.status(404).send({err: 'not found'})
}

exports.getByIdApart = async (req, res) => {
    await findUser(res, req.query)
}

exports.update = (req,res) => {
    let id = req.params.id;
    let {phone, type} = req.body
    let data = {phone, type}
    User.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, async (err, doc) => {
        if (err) res.status(500).send({err: err})
        else await findUser(res, {id_apartment: doc.id_apartment})
    });
}

exports.addNew = (req,res) => {
    let {phone, password, type, id_apartment} = req.body
    let data = {phone, password, type, id_apartment}
    let user1 = new User(data)
    user1.save(async (err) => {
        if (err) res.status(500).send({err: err})
        else await findUser(res, {id_apartment: id_apartment})
    })
}
