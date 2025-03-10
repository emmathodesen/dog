// imports
import express, { Application, Request, Response } from "express";
import dotenvFlow from "dotenv-flow";
import { testConnection } from './repository/database';
import { setupDocs } from "./util/documentation";
import cors from 'cors';

// Project imports
import routes from "./routes";

dotenvFlow.config();

// create express application
const app: Application = express();

/**
 * Setup CORS handling
 */
function setupCors() {
    app.use(cors({

        // allow request from any orgin
        origin: "*",

        // allow methods 
        methods: 'GET, PUT, POST, DELETE',

        // allow headers 
        allowedHeaders: ['auth-token', 'Origin', 'X-Requested-Width', 'Content-Type', 'Acept'],

        // allow credentials  
        credentials: true
    }))
}


export function startServer() {

    setupCors();

    // JSON body parser 
    app.use(express.json());

    // bind routes to the app
    app.use('/api', routes);  

    // ddjd
    setupDocs(app); 

   testConnection(); 
    // test db  connection

    const PORT: number = parseInt(process.env.PORT as string)  || 4000;
    app.listen(PORT, function(){
        console.log("Server is running on port: " + PORT  );
    });
}

