import { Router, Request, Response } from 'express';
import { 
    createDog,  
    getAllDogs, 
    getDogById, 
    updateDogById, 
    deleteDogById 
} from './controllers/dogController';  
import { loginUser, registerUser, verifyToken } from './controllers/authController';

const router: Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Basic route to check if the api is running
 *     responses:
 *       200:
 *         description: Server up and running.
 */

// GET, POST, PUT, DELETE (CRUD)

// Endret fra "products" til "dogs"
router.get('/', (req: Request, res: Response) => {
    // connect
    res.status(200).send('Welcome to the Dog API');  
    // diconnect
});

// AUTH
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a new user
 *     description: Takes a user in the body and tries to register it in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

// CREATE
router.post('/dogs', createDog);  

// GETS
router.get('/dogs', getAllDogs);  
/**
 * @swagger
 * /dogs/{id}:  
 *   get:
 *     tags:
 *       - Dog Routes // 
 *     summary: Specific Dog
 *     description: Retrieves a specific Dog based on it id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A Dog in the format of a JSON object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Dog"  
 */
router.get('/dogs/:id', getDogById); 

/**
 * @swagger
 * /dogs/{id}:  
 *   put:
 *     tags:
 *       - Dog Routes // 
 *     summary: Updates a specific Dog
 *     description: Updates a specific Dog based on it id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Dog"  
 *
 *     responses:
 *       201:
 *         description: Dog updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Dog" 
 */

// UPDATE + DELETE
// Endret fra "products" til "dogs"
router.put('/dogs/:id', updateDogById);  

/**
 * @swagger
 * /dogs/{id}:  
 *   delete:
 *     tags:
 *       - Dog Routes  
 *     summary: Deletes a specific Dog
 *     description: Deletes a specific Dog based on it id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *
 *     responses:
 *       201:
 *         description: Dog deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Dog"  
 */ 
router.delete('/dogs/:id', verifyToken, deleteDogById); 
 
export default router;
