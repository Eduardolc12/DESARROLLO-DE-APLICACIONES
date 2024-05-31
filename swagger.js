const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API de sistema de cafetería',
        description: 'API de sistema de cafetería',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const routes = ['./models/server.js'];
swaggerAutogen(outputFile, routes, doc);