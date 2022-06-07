const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InputSchema = new Schema({
    esp_id: { type: String },
    gpio_id: {
        type: String,
        enum: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'],
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
