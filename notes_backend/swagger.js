const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Notes Manager API',
      version: '1.0.0',
      description: 'RESTful API for managing personal notes (CRUD).',
    },
    tags: [
      { name: 'Notes', description: 'Notes management API' }
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
