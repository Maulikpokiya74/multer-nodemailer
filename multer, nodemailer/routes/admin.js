const express = require('express');

const routes = express.Router();

const adminController = require('../controllers/AdminController');

routes.post('/addAdmin', adminController.AddAdmin);
routes.post('/AdminLogin', adminController.AdminLogin);
routes.post('/ForgottenPassword', adminController.ForgottenPassword);
routes.post('/resetPassword', adminController.resetPassword);

module.exports = routes;