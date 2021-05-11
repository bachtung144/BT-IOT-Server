const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/user')

app.route('/users').get(controller.getListUsers);

module.exports = app;
