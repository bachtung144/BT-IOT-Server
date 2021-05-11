
const ListDevice = require('../models/listDevice')

exports.getListDevice = (req,res,next) => {
    ListDevice.find({}).then(
        data => {
            return data;
        }
    ).catch(err => err)
}
