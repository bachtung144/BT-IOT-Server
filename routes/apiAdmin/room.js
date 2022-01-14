const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/admin/room')

app.route('/admin/room').get(controller.getByIdApart);
app.route('/admin/room/:id').put(controller.update);
app.route('/admin/room').post(controller.addNew);

module.exports = app;
