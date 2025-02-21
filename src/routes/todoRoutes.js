// ./src/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController'); 
const { validateTodo } = require('../middleware/validationMiddleware'); // Validation Middleware

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API endpoints for managing social media to-do posts
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all to-do posts
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of to-do posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Internal server error
 */
router.get('/', todoController.getAllTodos); 

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a to-do post by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the to-do post
 *     responses:
 *       200:
 *         description: A single to-do post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: To-do post not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', todoController.getTodoById);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new to-do post
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo' 
 *     responses:
 *       201:
 *         description: To-do post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', validateTodo, todoController.createTodo); 

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a to-do post
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the to-do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: To-do post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo' 
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: To-do post not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', validateTodo, todoController.updateTodo); 

/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Partially update a to-do post
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the to-do post
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo' 
 *     responses:
 *       200:
 *         description: To-do post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo' 
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: To-do post not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', todoController.updateTodo); 

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a to-do post
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the to-do post to delete
 *     responses:
 *       200:
 *         description: To-do post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "To-do deleted successfully"
 *       404:
 *         description: To-do post not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
