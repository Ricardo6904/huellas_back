const swaggerJsdoc = require("swagger-jsdoc");
const path = require('path')
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API Spotify",
        description: "Esta documentación de api de genera automaticamente",
        contact: {
            name: "Curso AWS",
            url: "https://link.codigoencasa.com/CURSO",
            email: "leifer.contacto@gmail.com",
        }
    },
    servers: [
        {
            url: "http://localhost:4000/api",
            description: "Development server",
        },
    ],
    schemes: ["http"],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
    },

};

const options = {
    swaggerDefinition,
    apis: [`${path.join(__dirname, '../routes/*.js')}`],
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;