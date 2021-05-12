const ListRoom = require('../models/listRoom')

exports.getAllListRoom = (req,res) => {
    const {page,limit,idUser} = req.query;
    let parsePage = parseInt(page)
    let parseLimit = parseInt(limit)
    let skip =  (parsePage-1)*parseLimit
    ListRoom.find({id_user:idUser})
        .skip(skip).limit(parseLimit)
        .then(rooms => {
            if (!rooms) res.status(404).send({err:'not found'})
            else res.status(200).send({rooms:rooms})
        }).catch(err => res.send(err))
}
