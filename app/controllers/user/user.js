const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const tokenSecret = 'my-token-secret'
const Apartment = require('../../models/apartment')
const Building = require("../../models/building");

function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}

exports.checkLogin = async (req, res) => {
    const {phone, password} = req.body
    const user = await User.findOne({phone: phone})

    if (!user) res.status(401).send({msg: 'Số điện thoại hoặc mật khẩu không đúng!!'})
    else {
        bcrypt.compare(password, user.password, (error, match) => {
            if (match) res.status(200).send(
                {
                    id: user._id,
                    token: generateToken(user),
                    type: user.type,
                    id_apartment: user.id_apartment
                }
            )
            else res.status(401).json({msg: 'Số điện thoại hoặc mật khẩu không đúng!!'})
        })
    }
}

exports.getListInFamily = (req, res) => {
    const {idApartment} = req.query;

    User.find({id_apartment: idApartment}, {password: 0, id_apartment: 0})
        .then(
            users => {
                if (users) res.status(200).send({users: users})
                else res.status(404).send({err: 'not found'})
            }
        ).catch(error => res.status(404).send({err: 'not found'}))
}

exports.getInfor = async (req, res) => {
    const {userId} = req.params;
    const user = await User.findById(userId)

    if (!user) res.status(404).send({msg: 'không tìm thấy người dùng'})
    else {
        const apart = await Apartment.findById(user?.id_apartment)
        if (!apart) res.status(404).send({msg: 'người dùng chưa thuộc căn hộ nào'})
        else {
            const building = await Building.findById(apart?.id_building)
            if (!building) res.status(404).send({msg: 'người dùng chưa thuộc tòa nhà nào'})
            else res.status(200).send({
                phone: user.phone,
                building: building.name,
                address: building.address,
                city: building.city,
                district: building.district,
                apartment: apart.address
            })
        }
    }
}

exports.changePassword = async (req, res) => {
    const {oldPassword, newPassword, id} = req.body
    const user = await User.findById(id,'password')

    bcrypt.compare(oldPassword, user?.password, (error, match) => {
        if (match) {
            bcrypt.hash(newPassword, 10, function(err, hash) {
                User.findOneAndUpdate({_id:id},{$set:{password: hash}}, {useFindAndModify: false}, (err,doc) => {
                    if (err) res.status(404).json({msg: 'Có lỗi xin hãy thử lại!'})
                    else res.status(200).json({msg: 'Cập nhật mật khẩu thành công'})
                })
            })
        }
        else res.status(403).json({msg: 'Bạn nhập sai mật khẩu cũ'})
    })
}
