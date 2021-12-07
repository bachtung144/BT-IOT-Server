const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
    name: {
        type: String
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
    location: {
        type: Array
    },
})

const building = mongoose.model('BuildingModel', BuildingSchema,"Building")
module.exports = building;
