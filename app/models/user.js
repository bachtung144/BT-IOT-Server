const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name_user:{
        type: String
    },
    rooms:[
        { type: mongoose.Schema.Types.ObjectId, ref: 'ListRoom' }
    ]
    ,
    pass_word:{
        type: String
    }
})

const user = mongoose.model('UserModel',UserSchema,"User")
module.exports = user;
