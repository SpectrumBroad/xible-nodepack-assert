module.exports = function(NODE) {

	const AssertionError = require('../AssertionError');

	let valuesIn = NODE.getInputByName('values');

	let doneOut = NODE.getOutputByName('done');

	let triggerIn = NODE.getInputByName('trigger');
	triggerIn.on('trigger', (conn, state) => {

		const err = new AssertionError(NODE.data.message);

		valuesIn.getValues(state)
			.then((values) => {

				if (!values.length) {
					NODE.error(err, state);
					return;
				}

				for (let i = 0; i < values.length; ++i) {

					if (values[i] > NODE.data.baseline) {
						NODE.error(err, state);
						return;
					}

				}

				doneOut.trigger(state);

			});

	});

};
