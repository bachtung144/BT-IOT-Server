const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/admin/device')

app.route('/admin/device').get(controller.getByRoomId);

module.exports = app;
