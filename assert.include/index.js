module.exports = function(NODE) {

	let valuesIn = NODE.getInputByName('values');

	let doneOut = NODE.getOutputByName('done');

	let triggerIn = NODE.getInputByName('trigger');
	triggerIn.on('trigger', (conn, state) => {

		valuesIn.getValues(state)
			.then((values) => {

				if (!values.length) {
					NODE.fail(`AssertionError: ${NODE.data.message}`, state);
					return;
				}

				for (let i = 0; i < values.length; ++i) {

					if (typeof values[i] !== 'string' && !Array.isArray(values[i])) {
						NODE.fail(`AssertionError: ${NODE.data.message}`, state);
						return;
					}

					if (values[i].indexOf(NODE.data.search) === -1) {
						NODE.fail(`AssertionError: ${NODE.data.message}`, state);
						return;
					}

				}

				doneOut.trigger(state);

			});

	});

};
