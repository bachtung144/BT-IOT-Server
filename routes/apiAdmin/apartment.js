const express = require ('express');
const app = express.Router();
const controller  = require('../../app/controllers/admin/apartment')

app.route('/admin/apartment').get(controller.getByIdBuilding);
app.route('/admin/apartment').post(controller.addNew);
app.route('/admin/apartment/:id').put(controller.update);
app.route('/admin/apartment/:id').delete(controller.delete);

module.exports = app;
