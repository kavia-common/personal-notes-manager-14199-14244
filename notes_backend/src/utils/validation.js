'use strict';

/**
 * Simple validation helpers to avoid external deps.
 */

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isOptionalString(value) {
  return typeof value === 'undefined' || typeof value === 'string';
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
}

function validateCreateNote(body) {
  const errors = [];
  if (!isNonEmptyString(body.title)) {
    errors.push('title is required and must be a non-empty string');
  }
  if (!isNonEmptyString(body.content)) {
    errors.push('content is required and must be a non-empty string');
  }
  if (typeof body.tags !== 'undefined' && !isStringArray(body.tags)) {
    errors.push('tags must be an array of strings if provided');
  }
  return errors;
}

function validateUpdateNote(body) {
  const errors = [];
  if (
    typeof body.title === 'undefined' &&
    typeof body.content === 'undefined' &&
    typeof body.tags === 'undefined'
  ) {
    errors.push('at least one of title, content, or tags must be provided');
  }
  if (typeof body.title !== 'undefined' && !isOptionalString(body.title)) {
    errors.push('title must be a string if provided');
  } else if (typeof body.title === 'string' && body.title.trim().length === 0) {
    errors.push('title cannot be empty when provided');
  }
  if (typeof body.content !== 'undefined' && !isOptionalString(body.content)) {
    errors.push('content must be a string if provided');
  } else if (
    typeof body.content === 'string' &&
    body.content.trim().length === 0
  ) {
    errors.push('content cannot be empty when provided');
  }
  if (typeof body.tags !== 'undefined' && !isStringArray(body.tags)) {
    errors.push('tags must be an array of strings if provided');
  }
  return errors;
}

function validateIdParam(id) {
  if (!isNonEmptyString(id)) {
    return ['id must be a non-empty string'];
  }
  return [];
}

module.exports = {
  validateCreateNote,
  validateUpdateNote,
  validateIdParam,
};
