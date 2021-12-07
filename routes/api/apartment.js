const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/apartment')

app.route('/apartment/:idApartment').get(controller.getInfor);

module.exports = app;
