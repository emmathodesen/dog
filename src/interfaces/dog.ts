import { User } from "./user";


export interface Dog extends Document {
  name: string;            
  breed: string;           
  age: number;             
  description?: string;    
  imageURL?: string;       
  price: number;           
  stock: number;           
  discount: boolean;       
  discountPct: number;     
  isHidden: boolean;       
  _createdBy: User["id"];  
  _createdAt: Date;        
}

