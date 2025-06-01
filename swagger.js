const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'recipes API',
    description: 'recipes API'
  },
  info: {
    title: 'users API',
    description: 'users API'
  },
  host: 'localhost:4000',
  schemes: ['https', 'http']
};


const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);