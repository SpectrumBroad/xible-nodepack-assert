'use strict';

module.exports = (NODE) => {
  const AssertionError = require('../AssertionError');

  const valuesIn = NODE.getInputByName('values');

  const doneOut = NODE.getOutputByName('done');

  const triggerIn = NODE.getInputByName('trigger');
  triggerIn.on('trigger', (conn, state) => {
    const err = new AssertionError(NODE.data.message);

    valuesIn.getValues(state)
    .then((values) => {
      if (!values.length) {
        NODE.error(err, state);
        return;
      }

      for (let i = 0; i < values.length; i += 1) {
        if (values[i] > NODE.data.baseline) {
          NODE.error(err, state);
          return;
        }
      }

      doneOut.trigger(state);
    });
  });
};
