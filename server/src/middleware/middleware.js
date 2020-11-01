const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../swagger.json');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan('dev'));

  // Swagger Middleware
  app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
}