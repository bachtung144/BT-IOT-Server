const User = require('../models/user')

exports.getListUsers = (req,res,next) => {
    const {page,limit} = req.query;
    let parsePage = parseInt(page)
    let parseLimit = parseInt(limit)
    let skip =  (parsePage-1)*parseLimit
    User.find({}).skip(skip).limit(parseLimit).then(
        users => {
            res.send({
                status:true,
                data:users
            })
        }
    ).catch(err => res.send(err))
}
