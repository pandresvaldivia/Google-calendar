import {
	$miniCalendarContent,
	$miniCalendarHeader,
	$nextMonth,
	$prevMonth,
} from '../selectors';
import {
	date,
	getDatetime,
	getDateTimeMonth,
	getMonthData,
	getPreviousMonthData,
	resetDate,
} from '../helpers/calendar.helper';
import { formatDate, isToday } from '../helpers/date.helper';
import { MONTH_OPTIONS } from '../constants/date';
import { monthAbreviation } from '../helpers/string.helper';

function createMinicalendar() {
	printMonth();
	printHeaderInfo();
	addControls();
}

function printHeaderInfo() {
	const datetime = getDateTimeMonth(date);

	$miniCalendarHeader.datetime = datetime;
	$miniCalendarHeader.innerText = monthAbreviation(
		formatDate(date, MONTH_OPTIONS)
	);
}

function printMonth() {
	const { lastDay, firstWeekday } = getMonthData();
	const lastMonthDay = lastDay + firstWeekday - 1;
	const previousMonthDay = getPreviousMonthData(firstWeekday);
	const nextMonthDay = lastDay + firstWeekday - 1;

	clearElement($miniCalendarContent);

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

function addControls() {
	$nextMonth.addEventListener('click', () => {
		changeMonth($nextMonth);
		printHeaderInfo();
		printMonth();
	});

	$prevMonth.addEventListener('click', () => {
		changeMonth($prevMonth);
		printHeaderInfo();
		printMonth();
	});
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

function changeMonth({ id }) {
	id === 'nextMonth'
		? date.setMonth(date.getMonth() + 1)
		: date.setMonth(date.getMonth() - 1);
}

function resetMinicalendar() {
	resetDate();
	printHeaderInfo();
	printMonth();
}

export { createMinicalendar, resetMinicalendar };
