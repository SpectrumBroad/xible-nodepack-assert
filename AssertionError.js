'use strict';

class AssertionError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'AssertionError';
  }
}

module.exports = AssertionError;
