const Room = require('../models/room')

exports.getAllListRoom = (req,res) => {
    const {page,limit,idApartment} = req.query;
    let parsePage = parseInt(page)
    let parseLimit = parseInt(limit)
    let skip =  (parsePage-1)*parseLimit
    Room.find({id_apartment:idApartment} , {id_apartment: 0})
        .skip(skip).limit(parseLimit)
        .then(rooms => {
            if (!rooms) res.status(404).send({err:'not found'})
            else res.status(200).send({rooms: rooms})
        }).catch(err => res.send(err))
}
