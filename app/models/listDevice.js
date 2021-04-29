const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListDeviceSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    room:{
        type: String
    },
    device:{
        type: String
    },
    status:{
        type: Boolean
    },
    type:{
        type: String
    }
})

const listDevice = mongoose.model('Model',ListDeviceSchema,"ListDevice")
module.exports = listDevice;