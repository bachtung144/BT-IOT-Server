const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListDeviceSchema = new Schema({
    name:{
        type: String
    },
    status:{
        type: Boolean
    },
    type:{
        type: String
    },
    id_room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ListRoom'
    }
})

const listDevice = mongoose.model('ListDeviceModel',ListDeviceSchema,"ListDevice")
module.exports = listDevice;
