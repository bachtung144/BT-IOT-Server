const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/admin/chip')

app.route('/admin/chip').get(controller.getAll);
app.route('/admin/chip').post(controller.addNew);
app.route('/admin/chip/:id').put(controller.update);
app.route('/admin/chip/:id').delete(controller.delete);

module.exports = app;
