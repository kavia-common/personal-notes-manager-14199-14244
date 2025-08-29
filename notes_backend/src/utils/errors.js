'use strict';

class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'Resource not found') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

class BadRequestError extends HttpError {
  constructor(message = 'Bad request', details) {
    super(400, message, details);
    this.name = 'BadRequestError';
  }
}

module.exports = {
  HttpError,
  NotFoundError,
  BadRequestError,
};
