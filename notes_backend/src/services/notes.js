'use strict';

const store = require('../models/noteStore');
const { NotFoundError } = require('../utils/errors');

class NotesService {
  /**
   * Create a note.
   * @param {{title:string, content:string, tags?:string[]}} payload
   */
  create(payload) {
    return store.create(payload);
  }

  /**
   * List notes with optional filtering.
   * @param {{q?:string, tag?:string, page?:number, pageSize?:number}} query
   */
  list(query) {
    return store.list(query);
  }

  /**
   * Get a note by ID.
   * @param {string} id
   */
  get(id) {
    const note = store.getById(id);
    if (!note) throw new NotFoundError('Note not found');
    return note;
  }

  /**
   * Update a note by ID.
   * @param {string} id
   * @param {{title?:string, content?:string, tags?:string[]}} changes
   */
  update(id, changes) {
    const updated = store.update(id, changes);
    if (!updated) throw new NotFoundError('Note not found');
    return updated;
  }

  /**
   * Delete a note by ID.
   * @param {string} id
   */
  delete(id) {
    const deleted = store.delete(id);
    if (!deleted) throw new NotFoundError('Note not found');
    return { deleted: true };
  }
}

module.exports = new NotesService();
