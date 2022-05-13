const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/user/user')

app.route('/user/login').post(controller.checkLogin);

app.route('/user/list-in-family').get(controller.getListInFamily);

app.route('/user/:userId').get(controller.getInfor);

module.exports = app;
