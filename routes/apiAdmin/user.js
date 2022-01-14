const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/admin/user')

app.route('/admin/user').get(controller.getByIdApart);
app.route('/admin/user/:id').put(controller.update);
app.route('/admin/user').post(controller.addNew);


module.exports = app;
