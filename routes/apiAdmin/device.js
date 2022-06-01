const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/admin/device')

app.route('/admin/device').get(controller.getByRoomId);
app.route('/admin/device').post(controller.addNew);
app.route('/admin/device/:id').put(controller.update);
app.route('/admin/device/:id').delete(controller.delete);

module.exports = app;
