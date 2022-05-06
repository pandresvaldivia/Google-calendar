function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function twoDigitsFormat(string) {
	return string.toLocaleString('en-US', {
		minimumIntegerDigits: 2,
	});
}

function monthAbreviation(date) {
	const [month, , year] = date.split(' ');

	return `${month} ${year}`;
}

export { capitalize, twoDigitsFormat, monthAbreviation };
