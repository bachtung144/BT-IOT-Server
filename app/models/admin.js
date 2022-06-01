const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    password: {
        type: String
    },
    email: {
        type: String
    },
})

const admin = mongoose.model('AdminModel', AdminSchema,"Admin")
module.exports = admin;
