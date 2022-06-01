const User = require("../../models/user");
const Admin = require("../../models/admin");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenSecret = 'my-token-secret'

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
    let {phone, type, id_apartment} = req.body
    bcrypt.hash('1234', 10, function(err, hash) {
        let password = hash
        let data = {phone, type, password, id_apartment}
        let user1 = new User(data)
        user1.save(async (err) => {
            if (err) res.status(500).send({err: err})
            else await findUser(res, {id_apartment: id_apartment})
        })
    });
}

exports.delete = async (req,res) => {
    let id = req.params.id;
    let userId = await User.findById(id, 'id_apartment')

    const user = await User.deleteOne({_id: id})

    if (user) {await findUser(res, {id_apartment: userId?.id_apartment})}
    else res.status(500).send({err: 'delete error'})
}

function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}

exports.checkLogin = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    const admin = await Admin.findOne({email: email})

    if (!admin) res.status(401).send({msg: 'email hoặc mật khẩu không đúng!!'})
    else {
        bcrypt.compare(password, admin.password, (error, match) => {
            if (match) res.status(200).send(
                {
                    id: admin._id,
                    token: generateToken(admin),
                }
            )
            else res.status(401).json({msg: 'email hoặc mật khẩu không đúng!!'})
        })
    }
}
