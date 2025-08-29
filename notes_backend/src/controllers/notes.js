'use strict';

const notesService = require('../services/notes');
const {
  validateCreateNote,
  validateUpdateNote,
  validateIdParam,
} = require('../utils/validation');
const { BadRequestError } = require('../utils/errors');

class NotesController {
  // PUBLIC_INTERFACE
  /**
   * Create a new note.
   * Body: { title: string, content: string, tags?: string[] }
   */
  async create(req, res, next) {
    try {
      const errors = validateCreateNote(req.body || {});
      if (errors.length) {
        throw new BadRequestError('Validation failed', { errors });
      }
      const created = notesService.create(req.body);
      return res.status(201).json(created);
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * List notes with optional filtering and pagination.
   * Query: q?:string, tag?:string, page?:number, pageSize?:number
   */
  async list(req, res, next) {
    try {
      const { q, tag, page, pageSize } = req.query;
      const result = notesService.list({
        q,
        tag,
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
      });
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get a single note by ID.
   * Param: id
   */
  async get(req, res, next) {
    try {
      const errors = validateIdParam(req.params.id);
      if (errors.length) {
        throw new BadRequestError('Validation failed', { errors });
      }
      const note = notesService.get(req.params.id);
      return res.status(200).json(note);
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Update a note by ID.
   * Param: id
   * Body: { title?: string, content?: string, tags?: string[] }
   */
  async update(req, res, next) {
    try {
      const idErrors = validateIdParam(req.params.id);
      if (idErrors.length) {
        throw new BadRequestError('Validation failed', { errors: idErrors });
      }
      const errors = validateUpdateNote(req.body || {});
      if (errors.length) {
        throw new BadRequestError('Validation failed', { errors });
      }
      const updated = notesService.update(req.params.id, req.body);
      return res.status(200).json(updated);
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a note by ID.
   * Param: id
   */
  async remove(req, res, next) {
    try {
      const errors = validateIdParam(req.params.id);
      if (errors.length) {
        throw new BadRequestError('Validation failed', { errors });
      }
      const result = notesService.delete(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new NotesController();
