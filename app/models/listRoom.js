const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListRoom = new Schema({
    name_room:{
        type: String
    },
    id_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    devices:[
        { type: mongoose.Schema.Types.ObjectId, ref: 'ListDevice' }
    ]
})

const listRoom = mongoose.model('ListRoomModel',ListRoom,"ListRoom")
module.exports = listRoom;
