'use strict';

const express = require('express');
const notesController = require('../controllers/notes');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes management API
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: List notes
 *     description: Retrieve a paginated list of notes with optional text search and tag filter.
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Text to search in title and content.
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter by a tag.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number (default 1).
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Items per page (default 20, max 100).
 *     responses:
 *       200:
 *         description: List of notes.
 */
router.get('/', notesController.list.bind(notesController));

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Note created.
 *       400:
 *         description: Validation error.
 */
router.post('/', notesController.create.bind(notesController));

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested note.
 *       404:
 *         description: Note not found.
 */
router.get('/:id', notesController.get.bind(notesController));

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Updated note.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Note not found.
 */
router.put('/:id', notesController.update.bind(notesController));

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletion result.
 *       404:
 *         description: Note not found.
 */
router.delete('/:id', notesController.remove.bind(notesController));

module.exports = router;
