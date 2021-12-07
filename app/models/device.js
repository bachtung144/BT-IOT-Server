const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    name: {
        type: String
    },
    status: {
        type: Number
    },
    location: {
        type: Array
    },
    id_room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
})

const device = mongoose.model('ListDeviceModel' ,DeviceSchema,"Device")
module.exports = device;
