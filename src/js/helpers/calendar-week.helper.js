import { twoDigitsFormat } from './string.helper';

export let date = new Date();

function getWeekDatetime(day, monthType) {
	const year = date.getFullYear();
	let month = getPropertyMonth(monthType);
	month = twoDigitsFormat(month);
	day = twoDigitsFormat(day);

	return `${year}-${month}-${day}T00:00:00`;
}

function getLastDayPrevMonth() {
	const lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

	return lastDay;
}

function getLastDay() {
	const lastDay = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDate();

	return lastDay;
}

function getDatetimeHour(datetime, hour) {
	hour = twoDigitsFormat(hour - 1);

	return datetime.replace('00', hour);
}

function getPropertyMonth(monthType) {
	const month =
		monthType === 'CURRENT'
			? date.getMonth() + 1
			: monthType === 'PREV'
			? date.getMonth()
			: date.getMonth() + 2;

	return month;
}

function isCurrentTime(date) {
	const now = new Date();
	const hour = twoDigitsFormat(now.getHours());
	const currentTime = `${now.toLocaleDateString('en-CA')}T${hour}:00:00`;

	if (date === currentTime) return true;
}

function resetDate() {
	date = new Date();
}

export {
	getWeekDatetime,
	getLastDayPrevMonth,
	getLastDay,
	getDatetimeHour,
	resetDate,
	isCurrentTime,
};
