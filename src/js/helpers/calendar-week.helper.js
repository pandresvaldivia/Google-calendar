import { twoDigitsFormat } from './string.helper';

export const date = new Date();

function getWeekDatetime(day) {
	const year = date.getFullYear();
	const month = twoDigitsFormat(date.getMonth() + 1);
	day = twoDigitsFormat(day);

	return `${year}-${month}-${day}T00:00:00`;
}

export { getWeekDatetime };
