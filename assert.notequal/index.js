module.exports = function(NODE) {

	const AssertionError = require('../AssertionError');

	let valuesIn = NODE.getInputByName('values');

	let doneOut = NODE.getOutputByName('done');

	let triggerIn = NODE.getInputByName('trigger');
	triggerIn.on('trigger', (conn, state) => {

		const err = new AssertionError(NODE.data.message);

		valuesIn.getValues(state)
			.then((values) => {

				if (!values.length || values.length === 1) {
					doneOut.trigger(state);
					return;
				}

				let firstVal = values[0];
				for (let i = 1; i < values.length; ++i) {

					if (values[i] === firstVal) {
						NODE.error(err, state);
						return;
					}

				}

				doneOut.trigger(state);

			});

	});

};
