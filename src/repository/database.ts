import { error } from "console";
import mongoose from "mongoose";


export async function testConnection(){
     try {
        await connect();
        await disconnect(); 
        console.log("Database connection was succsessfull (connect + disconnect)");
     }
     catch (error){
        console.log("Error testing database connection. Error:" + error); 
     } 
}


export async function connect() {
    try
    {
        if (!process.env.DBHOST){
            throw new Error("DBHOST enviroment variable is not defined");
        }
        await mongoose.connect(process.env.DBHOST);

        if (mongoose.connection.db) {
            await mongoose.connection.db.admin().command({ping: 1}); 
            console.log("Connection established");
        }

        else {
            throw new Error("Database connection is not established"); 
        }
    }
    catch (error) {
        console.log("Error connecting to the database. Error" + error);
    }
}

export async function disconnect(){
    try {
        await mongoose.disconnect(); 
        console.log("Connection closed");
    }
    catch(error) {
        console.log("Error closing database connection. Error:" + error); 
    }
}