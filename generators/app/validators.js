function name(input) {
	// disallow uppercase and most symbols
	const regex = /[A-Z!@#$%^&*\(\)+=_,.~`{}\[\]<>/0-9\s]/g;
	if (regex.test(input)) {
		return false;
	}

	return true;
}

function version(input) {
	// disallow uppercase and most symbols
	const regex = /[A-Z!@#$%^&*\(\)+=_,~`{}\[\]<>/\s]/g;
	if (regex.test(input)) {
		return false;
	}

	return true;
}

module.exports = {
	name,
	version
};
