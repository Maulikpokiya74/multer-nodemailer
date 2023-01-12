const express = require('express');

const routes = express.Router();

const clientController = require('../controllers/clientController');

routes.post('/insert-client-section', clientController.InsertClintRecord);
routes.get('/view-client-section', clientController.ViewClintRecord);
routes.delete('/delete-client-section/:id', clientController.DeleteClintRecord);
routes.put('/update-client-section/:id', clientController.UpdateClintRecord);

module.exports = routes;