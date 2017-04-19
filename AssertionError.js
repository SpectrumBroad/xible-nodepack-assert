class AssertionError extends Error {
	constructor() {
		super(...arguments);
		this.name = 'AssertionError';
	}
}

module.exports = AssertionError;
