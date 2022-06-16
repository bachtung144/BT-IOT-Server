const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: {
        type: String
    },
    phone: {
        type: String
    },
    apartment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' }

})

const user = mongoose.model('UserModel', UserSchema,"User")
module.exports = user;
