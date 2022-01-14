const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/user/user')

app.route('/user/login').get(controller.checkLogin);

app.route('/user/list-in-family').get(controller.getListInFamily);

module.exports = app;
