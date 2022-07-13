const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/admin/user')

app.route('/admin/user').get(controller.getByIdApart);
app.route('/admin/user/:id').put(controller.update);
app.route('/admin/user').post(controller.addNew);
app.route('/admin/user/:id').delete(controller.delete);
app.route('/admin/login').post(controller.checkLogin);
app.route('/admin/change-password').put(controller.changePassword);

module.exports = app;
