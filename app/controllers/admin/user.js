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
    let {phone} = req.body
    let data = {phone}
    User.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, async (err, doc) => {
        if (err) res.status(500).send({err: err})
        else await findUser(res, {apartment_id: doc.apartment_id})
    });
}

exports.addNew = (req,res) => {
    let {phone, apartment_id} = req.body
    bcrypt.hash('1234', 10, function(err, hash) {
        let password = hash
        let data = {phone, password, apartment_id}
        let user1 = new User(data)
        user1.save(async (err) => {
            if (err) res.status(500).send({err: err})
            else await findUser(res, {apartment_id: apartment_id})
        })
    });
}

exports.delete = async (req,res) => {
    let id = req.params.id;
    let userId = await User.findById(id, 'apartment_id')

    const user = await User.deleteOne({_id: id})

    if (user) {await findUser(res, {apartment_id: userId?.apartment_id})}
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

exports.changePassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body
    const admin = await Admin.find({})

    bcrypt.compare(oldPassword, admin[0]?.password, (error, match) => {
        if (match) {
            bcrypt.hash(newPassword, 10, function(err, hash) {
                Admin.findOneAndUpdate({_id:admin[0]?._id},{$set:{password: hash}}, {useFindAndModify: false}, (err,doc) => {
                    if (err) res.status(404).json({msg: 'Có lỗi xin hãy thử lại!'})
                    else res.status(200).json({msg: 'Cập nhật mật khẩu thành công! Hãy đăng nhập lại'})
                })
            })
        }
        else res.status(403).json({msg: 'Bạn nhập sai mật khẩu cũ'})
    })
}

