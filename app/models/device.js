const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InputSchema = new Schema({
    chipId: {
        type: String
    },
    gpio: {
        type: Number
    }
});

const DeviceSchema = new Schema({
    name: {
        type: String
    },
    status: {
        type: Number
    },
    id_room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    input: {
        type: InputSchema,
        unique: true
    }
})

const device = mongoose.model('ListDeviceModel' ,DeviceSchema,"Device")
module.exports = device;
