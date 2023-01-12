const express = require('express');

const routes = express.Router();

routes.use('/client', require('./client'));
routes.use('/admin', require('./admin'));

module.exports = routes;