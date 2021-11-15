const Device = require('../models/device')

exports.getListDevice = (req,res,next) => {
    Device.find({}).then(
        data => {
            return data;
        }
    ).catch(err => err)
}
