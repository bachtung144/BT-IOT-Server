const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/user/room')

app.route('/rooms').get(controller.getAllListRoom);
app.route('/rooms/:roomId/devices').get(controller.getListDeviceByRoom);

module.exports = app;
