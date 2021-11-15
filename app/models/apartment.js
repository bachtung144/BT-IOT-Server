const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
    location: {
        type: Array
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    district: {
        type: String
    },
    name: {
        type: String
    }
})

const user = mongoose.model('UserModel', ApartmentSchema,"Apartment")
module.exports = user;
