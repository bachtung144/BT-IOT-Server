const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/user/device')

app.route('/devices/:deviceId').put(controller.updateDevice);

module.exports = app;
