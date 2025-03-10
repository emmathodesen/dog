import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';

/**
 * Setup swagger documentation
 * @param app 
 */
export function setupDocs(app: Application) {
  // Swagger definition
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for Dog Management',
      version: '1.0.0',
      description:
        'This is a REST API application for managing dogs. It allows for user authentication, CRUD operations on dogs, and managing dog details.',
    },
    servers: [
      {
        url: 'http://localhost:4000/api/',
        description: 'Development server',
      },
      {
        url: 'https://your-app-url.com/api/',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Dog Routes',
        description: 'Routes that handle dog-related operations (CRUD)',
      },
      {
        name: 'User Routes',
        description: 'Routes that handle user authentication and management',
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
        Dog: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            breed: { type: 'string' }, 
            age: { type: 'number' },
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

  // Swagger options
  const options = {
    swaggerDefinition,
    // Path to the files containing OpenAPI definitions
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],  // Sørg for at Swagger kan finne de relevante filene med @swagger kommentarer
  };

  // Swagger spec
  const swaggerSpec = swaggerJSDoc(options);

  // Create docs route
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

