const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: {
        type: String
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        enum: ['root', 'child'],
        default: 'child'
    },
    id_apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' }

})

const user = mongoose.model('UserModel', UserSchema,"User")
module.exports = user;
