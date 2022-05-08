function createTimeIndicator() {
	let minutes = new Date().getMinutes();
	const $currentTime = document.createElement('div');
	$currentTime.classList.add('currentTime');
	$currentTime.style.top = setTimePosisition(minutes);

	setInterval(() => {
		minutes = new Date().getMinutes();
		$currentTime.style.top = setTimePosisition(minutes);
	}, 60000);

	return $currentTime;
}

function setTimePosisition(minutes) {
	const position = (minutes / 60) * 100;

	return `${position}%`;
}

export { createTimeIndicator };
