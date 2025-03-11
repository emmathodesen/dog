import { Request, Response } from 'express';
import { dogModel } from '../models/dogModel';  
import { connect, disconnect } from '../repository/database';

/**
 * @swagger
 * /dogs:
 *   post:
 *     summary: Creates a new dog
 *     description: Creates a new dog based on the data provided in the request body
 *     tags:
 *       - Dog Routes
 *     requestBody:
 *       description: Dog object that needs to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dog'
 *     responses:
 *       201:
 *         description: Dog successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       400:
 *         description: Invalid input
 */
export async function createDog(req: Request, res: Response): Promise<void> {
    const data = req.body;

    console.log('Received dog data:', data); 

    try {
        await connect();

        // Dog to db
        const dog = new dogModel(data);
        const result = await dog.save();

        console.log('Dog created:', result);  

    
        res.status(201).send(result);
    } catch (err) {
        console.error("Error creating dog. Error:", err);  
        res.status(500).send("Error creating dog. Error: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * @swagger
 * /dogs:
 *   get:
 *     summary: Retrieves all dogs
 *     description: Retrieves a list of all dogs in the database
 *     tags:
 *       - Dog Routes
 *     responses:
 *       200:
 *         description: List of all dogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dog'
 */
export async function getAllDogs(req: Request, res: Response): Promise<void> {
    try {
        await connect();

        // Get all dogs in db
        const result = await dogModel.find({});

        // return list of dogs
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error retrieving dogs. Error: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * @swagger
 * /dogs/{id}:
 *   get:
 *     summary: Retrieves a specific dog by its id
 *     description: Retrieves a dog based on the provided ID
 *     tags:
 *       - Dog Routes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the dog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific dog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       404:
 *         description: Dog not found
 */
export async function getDogById(req: Request, res: Response): Promise<void> {
    try {
        await connect();

        const id = req.params.id;

        // Get dog by id
        const result = await dogModel.findById(id);

        if (!result) {
            res.status(404).send('Dog not found with id =' + id);
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(500).send("Error retrieving dog by id. Error: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * @swagger
 * /dogs/{id}:
 *   put:
 *     summary: Updates a specific dog by its id
 *     description: Updates a dog based on the provided ID and data in the request body
 *     tags:
 *       - Dog Routes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the dog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dog object with updated data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dog'
 *     responses:
 *       200:
 *         description: Dog successfully updated
 *       404:
 *         description: Dog not found
 *       400:
 *         description: Invalid input
 */
export async function updateDogById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
        await connect();

        // make dog by ID
        const result = await dogModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            res.status(404).send('Cannot update dog with id =' + id);
        } else {
            res.status(200).send('Dog was successfully updated');
        }
    } catch (err) {
        res.status(500).send("Error updating dog by id. Error: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * @swagger
 * /dogs/{id}:
 *   delete:
 *     summary: Deletes a dog by its id
 *     description: Deletes a dog based on the provided ID
 *     tags:
 *       - Dog Routes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the dog to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dog successfully deleted
 *       404:
 *         description: Dog not found
 */
export async function deleteDogById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
        await connect();

        // delete dog by ID
        const result = await dogModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send('Cannot delete dog with id =' + id);
        } else {
            res.status(200).send('Dog was successfully deleted');
        }
    } catch (err) {
        res.status(500).send("Error deleting dog by id. Error: " + err);
    } finally {
        await disconnect();
    }
};
