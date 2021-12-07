const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
    address: {
        type: String
    },
    id_building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' }
})

const apartment = mongoose.model('ApartmentModel', ApartmentSchema,"Apartment")
module.exports = apartment;
