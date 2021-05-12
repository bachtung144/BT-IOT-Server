const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/user')

app.route('/users/login').get(controller.checkLogin);

module.exports = app;
