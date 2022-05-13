const Device = require("../../models/device");

exports.getByRoomId = async (req, res) => {
    const device = await Device.find(req.query)
    if (device) res.status(200).send({data: device})
    else res.status(404).send({err: 'not found'})
}
