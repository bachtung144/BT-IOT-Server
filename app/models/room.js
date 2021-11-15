const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String
    },
    id_apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' }
})

const room = mongoose.model('RoomModel', RoomSchema,"Room")
module.exports = room;
