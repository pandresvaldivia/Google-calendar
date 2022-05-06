import { twoDigitsFormat } from './string.helper';

const date = new Date();

function getMonthData() {
	const lastDay = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDate();

	const firstWeekday = new Date(
		date.getFullYear(),
		date.getMonth(),
		1
	).getDay();

	return {
		lastDay,
		firstWeekday,
	};
}

function getPreviousMonthData(day) {
	const startIndexMonth = -day + 1;

	const startPreviousMonth = new Date(
		date.getFullYear(),
		date.getMonth(),
		startIndexMonth
	).getDate();

	return startPreviousMonth;
}

function getDatetime(day, monthType) {
	let month = date.getMonth() + 1;
	const year = date.getFullYear();

	if (monthType !== 'current') {
		month = monthType === 'prev' ? date.getMonth() : date.getMonth() + 2;
	}

	month = twoDigitsFormat(month);
	day = twoDigitsFormat(day);

	return `${year}-${month}-${day}T00:00:00`;
}

function getDateTimeMonth(date) {
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${year}-${month}`;
}

export { getMonthData, getPreviousMonthData, getDatetime, getDateTimeMonth };
