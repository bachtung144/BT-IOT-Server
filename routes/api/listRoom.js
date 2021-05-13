const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/listRoom')

app.route('/listRoom').get(controller.getAllListRoom);

module.exports = app;
