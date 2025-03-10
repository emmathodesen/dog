import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';


/**
 * Setup swagger documentation
 * @param app 
 */
export function setupDocs (app: Application){

    // swagger definition
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Express API for JSONPlaceholder',
            version: '1.0.0',
            description:
                'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/',
                description: 'Development server',
            },
            {
                url: 'https://ments-restapi.onrender.com/api/',
                description: 'Online deployment server (render.com)',
            },
        ],

        tags: [
            {
                name: 'Product Routes',
                description: 'Routes that handles products',
            },
            {
                name: 'User Routes',
                description: 'Routes that handles users',
            },
        ],

        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                },
            },
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        imageURL: { type: 'string' },
                        price: { type: 'number' },
                        stock: { type: 'number' },
                        discount: { type: 'boolean' },
                        discountPct: { type: 'number' },
                        isHidden: { type: 'boolean' },
                        _createdBy: { type: 'string' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                        registerDate: { type: 'string' },
                    },
                },
            },
        },
    };


    // swagger options
    const options = {  
        swaggerDefinition,
        // path to the files containing OpenApi definitions  
        apis: ['**/*.ts']
    }
    // swagger spec
    const swaggerSpec = swaggerJSDoc(options);

    // create docs route
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

}