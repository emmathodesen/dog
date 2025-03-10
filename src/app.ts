import express, { Application, Request, Response } from "express";
import dotenvFlow from "dotenv-flow";
import { testConnection } from './repository/database';
import { setupDocs } from "./util/documentation";
import cors from 'cors';

// Project imports
import routes from "./routes";

// Load environment variables
dotenvFlow.config();

// Create express application
const app: Application = express();

/**
 * Setup CORS handling
 */
function setupCors() {
    app.use(cors({
        // Allow request from any origin
        origin: "*",

        // Allow methods 
        methods: 'GET, PUT, POST, DELETE',

        // Allow headers
        allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Corrected typo 'X-Requested-Width' to 'X-Requested-With'

        // Allow credentials
        credentials: true
    }));
}

/**
 * Start the server
 */
export function startServer() {

    setupCors();

    // JSON body parser 
    app.use(express.json());

    // Bind routes to the app
    app.use('/api', routes);

    // Setup Swagger documentation
    setupDocs(app);

    // Test DB connection
    testConnection().then(() => {
        console.log('Connected to the database successfully.');
    }).catch((err) => {
        console.error('Error connecting to the database:', err);
    });

    // Get PORT from environment variables (default 4000)
    const PORT: number = parseInt(process.env.PORT as string, 10) || 4000;

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}

