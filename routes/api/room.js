const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/room')

app.route('/listRoom').get(controller.getAllListRoom);

module.exports = app;
