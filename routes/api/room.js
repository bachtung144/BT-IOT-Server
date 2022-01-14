const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/user/room')

app.route('/room').get(controller.getAllListRoom);

module.exports = app;
