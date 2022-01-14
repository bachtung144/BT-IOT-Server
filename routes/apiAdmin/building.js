const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/admin/building')

app.route('/admin/building').get(controller.getAll);
app.route('/admin/building').post(controller.addNew);
app.route('/admin/building/:id').put(controller.update);
app.route('/admin/building/:id').delete(controller.delete);

module.exports = app;
