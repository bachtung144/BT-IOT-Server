const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listDeviceSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    room:{
        type: String
    },
    type:{
        type: String
    },
    device:{
        type: String
    },
    status:{
        type: Boolean
    }
})

const listDevice = mongoose.model('Model',listDeviceSchema,"ListDevice")
module.exports = listDevice;
