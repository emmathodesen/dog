# Dog API Project

INTRODUCTION
This is a backend project for a Dog API application. It includes a RESTful API with authentication, user management, and basic CRUD operations.


FEATURES
User Registration and Login: Users can register and log in, receiving an authentication token upon successful login.
JWT Authentication: The API uses JWT (JSON Web Tokens) for secure authentication.
CRUD Operations: The backend supports basic CRUD operations for dog data.
Error Handling: Proper error handling is implemented to manage different error scenarios.


TECHNOLOGIES USED:
Node.js: JavaScript runtime used for the backend.
Express.js: Web framework for building the API.
MongoDB: NoSQL database for storing user and dog data.
JWT (JSON Web Tokens): Used for user authentication.
Bcrypt.js: Password hashing library for security.
Joi: For data validation.



SETUP INSTRUCTIONS


PREREQUISITES:
Node.js: Make sure Node.js is installed. You can download it here.
MongoDB: You should have MongoDB set up or use a cloud service like MongoDB Atlas.


INSTALLATION:
Clone the repository:
git clone https://github.com/emmathodesen/dog-api.git


INSTALL DEPENDENCIES:
cd dog-api
npm install
Set up your environment variables in a .env file. 
Example:
MONGO_URI=mongodb://localhost:27017/dog_api
TOKEN_SECRET=your_secret_key


START THE SERVER:
npm start
The backend will be running on http://localhost:4000.



API ENDPOINTS

1. POST /api/register
Description: Register a new user.
Request Body: { "name": "User Name", "email": "user@example.com", "password": "password123" }
Response: 200 OK with the user ID or error message.

2. POST /api/login
Description: Login an existing user.
Request Body: { "email": "user@example.com", "password": "password123" }
Response: 200 OK with the JWT token or error message.

3. GET /api/dogs (Example endpoint for CRUD operations)
Description: Fetch a list of dogs from the database.
Response: A list of dog objects.

4. POST /api/dogs (Create a new dog entry)
Description: Create a new dog entry.
Request Body: { "name": "Rex", "breed": "Labrador", "age": 3 }
Response: 201 Created with the dog data.

