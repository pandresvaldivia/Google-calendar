import { twoDigitsFormat } from './string.helper';

export const date = new Date();

function getWeekDatetime(day, monthType) {
	const year = date.getFullYear();
	let month = monthType === 'CURRENT' ? date.getMonth() + 1 : date.getMonth();
	month = twoDigitsFormat(month);
	day = twoDigitsFormat(day);

	return `${year}-${month}-${day}T00:00:00`;
}

function getLastDayPrevMonth() {
	const lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

	return lastDay;
}

export { getWeekDatetime, getLastDayPrevMonth };
