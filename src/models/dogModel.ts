import { Schema, model } from "mongoose";
import { Dog } from "../interfaces/dog"; 

// Create a DB schema for Dog
const dogSchema = new Schema<Dog>({
  name: { type: String, required: true },  
  breed: { type: String, required: true },  
  age: { type: Number, required: true },  
  description: { type: String },  
  imageURL: { type: String }, 
  _createdBy: { type: String, ref: "User", required: true },
  _createdAt: { type: Date, default: Date.now },  
});

// Create a Model for Dog
export const dogModel = model<Dog>("Dog", dogSchema);
