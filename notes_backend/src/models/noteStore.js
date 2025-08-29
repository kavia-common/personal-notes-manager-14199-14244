'use strict';

/**
 * A simple in-memory note store with persistence-ready interface.
 * Replace this module with a DB-backed implementation in production if needed.
 */
const { randomUUID } = require('crypto');

class NoteStore {
  constructor() {
    /** @type {Map<string, any>} */
    this.notes = new Map();
  }

  /**
   * Create a new note.
   * @param {{title:string, content:string, tags?:string[]}} data
   * @returns {any}
   */
  create(data) {
    const now = new Date().toISOString();
    const id = randomUUID();
    const note = {
      id,
      title: data.title,
      content: data.content,
      tags: Array.isArray(data.tags) ? data.tags : [],
      createdAt: now,
      updatedAt: now,
    };
    this.notes.set(id, note);
    return note;
  }

  /**
   * Get all notes with basic filtering and pagination.
   * @param {{q?:string, tag?:string, page?:number, pageSize?:number}} opts
   * @returns {{items:any[], page:number, pageSize:number, total:number}}
   */
  list(opts = {}) {
    const q = (opts.q || '').toLowerCase();
    const tag = opts.tag || null;
    const page = Math.max(1, Number(opts.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(opts.pageSize) || 20));

    let items = Array.from(this.notes.values());
    if (q) {
      items = items.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      );
    }
    if (tag) {
      items = items.filter((n) => Array.isArray(n.tags) && n.tags.includes(tag));
    }

    const total = items.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paged = items.slice(start, end);

    return { items: paged, page, pageSize, total };
  }

  /**
   * Get a note by ID.
   * @param {string} id
   * @returns {any | null}
   */
  getById(id) {
    return this.notes.get(id) || null;
  }

  /**
   * Update a note.
   * @param {string} id
   * @param {{title?:string, content?:string, tags?:string[]}} changes
   * @returns {any | null}
   */
  update(id, changes) {
    const existing = this.notes.get(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...('title' in changes ? { title: changes.title } : {}),
      ...('content' in changes ? { content: changes.content } : {}),
      ...('tags' in changes
        ? { tags: Array.isArray(changes.tags) ? changes.tags : existing.tags }
        : {}),
      updatedAt: new Date().toISOString(),
    };
    this.notes.set(id, updated);
    return updated;
  }

  /**
   * Delete a note.
   * @param {string} id
   * @returns {boolean}
   */
  delete(id) {
    return this.notes.delete(id);
  }
}

module.exports = new NoteStore();
