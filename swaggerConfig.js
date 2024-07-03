const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación de la API de nuestro proyecto'
        },
        servers: [
            {
                url: 'http://localhost:9090',
                description: 'Servidor de desarrollo'
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/models/*.js'], // Archivos a documentar
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
