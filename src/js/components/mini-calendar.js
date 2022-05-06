import { $miniCalendarContent, $miniCalendarHeader } from '../selectors';
import {
	getDatetime,
	getDateTimeMonth,
	getMonthData,
	getPreviousMonthData,
} from '../helpers/calendar.helper';
import { formatDate } from '../helpers/date.helper';
import { MONTH_OPTIONS } from '../constants/date';
import { monthAbreviation } from '../helpers/string.helper';

function printMonth() {
	const { lastDay, firstWeekday } = getMonthData();
	const lastMonthDay = lastDay + firstWeekday - 1;
	const previousMonthDay = getPreviousMonthData(firstWeekday);
	const nextMonthDay = lastDay + firstWeekday - 1;

	clearElement($miniCalendarContent);

	printHeaderInfo();

	for (let day = 0; day < 42; day++) {
		if (day < firstWeekday) {
			const previousDate = previousMonthDay + day;
			createCell(previousDate, 'prev');
			continue;
		}

		if (day > lastMonthDay) {
			const nextDate = day - nextMonthDay;
			createCell(nextDate, 'next');
			continue;
		}

		const currentMonthDay = day - firstWeekday + 1;
		createCell(currentMonthDay);
	}
}

function printHeaderInfo() {
	const date = new Date();
	const datetime = getDateTimeMonth(date);

	$miniCalendarHeader.datetime = datetime;
	$miniCalendarHeader.innerText = monthAbreviation(
		formatDate(date, MONTH_OPTIONS)
	);
}

function createCell(day, monthType = 'current') {
	const datetime = getDatetime(day, monthType);

	const cell = document.createElement('time');
	cell.classList.add('miniCalendarDay');
	cell.dateTime = datetime;
	cell.innerText = day;

	if (monthType !== 'current') cell.classList.add('is-inactive');
	if (isToday(datetime)) cell.classList.add('is-selected');

	$miniCalendarContent.appendChild(cell);
}

function clearElement($element) {
	while ($element.firstElementChild) {
		$element.firstElementChild.remove();
	}
}

function isToday(date) {
	const currentDate = `${new Date().toLocaleDateString('en-CA')}T00:00:00`;

	if (date === currentDate) return true;
}

export { printMonth };
