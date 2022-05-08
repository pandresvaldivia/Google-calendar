import { WEEK_DAYS } from '../constants/calendar';
import {
	date,
	getDatetimeHour,
	getLastDay,
	getLastDayPrevMonth,
	getWeekDatetime,
	isCurrentTime,
	resetDate,
} from '../helpers/calendar-week.helper';
import { isToday } from '../helpers/date.helper';
import {
	$calendarHeader,
	$calendarWeek,
	$modalContainer,
	$nextWeek,
	$prevWeek,
} from '../selectors';
import { createTimeIndicator } from './current-time';
import Modal from './modal';

const modal = new Modal($modalContainer);
let weekdaysDatetime = [];

function createWeekCalendar() {
	printCalendar();
	addControls();
}

function printCalendar() {
	clearCalendar();
	printHeaderInfo();
	printWeekCells();
}

function printHeaderInfo() {
	const weekDay = date.getDay();
	const monthDay = date.getDate();
	const lastDay = getLastDay();
	const firstWeekDay = monthDay - weekDay;
	weekdaysDatetime = [];

	createTimeZone('GMT-05');

	for (let day = 0; day < 7; day++) {
		let dayNumber = firstWeekDay + day;

		if (dayNumber <= 0) {
			dayNumber = getLastDayPrevMonth() + dayNumber;
			createCalendarDay(dayNumber, day, 'PREV');

			continue;
		}

		if (dayNumber > lastDay) {
			dayNumber -= lastDay;
			createCalendarDay(dayNumber, day, 'NEXT');

			continue;
		}

		createCalendarDay(dayNumber, day);
	}
}

function clearCalendar() {
	clearHeader();
	clearTaskCells();
}

function clearHeader() {
	while ($calendarHeader.firstChild) {
		$calendarHeader.firstChild.remove();
	}
}

function clearTaskCells() {
	while ($calendarWeek.firstChild) {
		$calendarWeek.firstChild.remove();
	}
}

function createTimeZone(timezone) {
	const $timeZone = document.createElement('span');
	$timeZone.classList.add('timezoneCell');
	$timeZone.innerText = timezone;

	$calendarHeader.appendChild($timeZone);
}

function createCalendarDay(monthDay, weekDay, monthType = 'CURRENT') {
	const datetime = getWeekDatetime(monthDay, monthType);
	weekdaysDatetime.push(datetime);

	const $calendarDay = document.createElement('h2');
	$calendarDay.classList.add('calendarDay');
	if (isToday(datetime)) $calendarDay.classList.add('is-selected');

	$calendarDay.innerHTML = `
        <a href="#" aria-label="24 de abril del 2021">
            <time class="calendarDay-date" datetime="${datetime}">
                <span>${WEEK_DAYS[weekDay]}</span>
                <span class="calendarDay-weekday">${monthDay}</span>
            </time>
        </a>
    `;

	$calendarHeader.appendChild($calendarDay);
}

function printWeekCells() {
	let hour = 0;

	for (let weekCell = 0; weekCell < 192; weekCell++) {
		const cellPosition = (weekCell + 7) % 8;

		if (cellPosition === 7) {
			createHourCell(hour);
			hour++;

			continue;
		}

		createTaskCell(cellPosition, hour);
	}
}

function createHourCell(hour) {
	const sufix = hour > 12 ? 'pm' : 'am';
	const hourText = hour > 12 ? hour - 12 : hour;
	const $hourCell = document.createElement('span');
	$hourCell.classList.add('hourCell');
	$hourCell.innerText = hour > 0 ? `${hourText} ${sufix}` : '';

	$calendarWeek.appendChild($hourCell);
}

function createTaskCell(weekday, hour) {
	const $taskCell = document.createElement('div');
	const datetime = getDatetimeHour(weekdaysDatetime[weekday], hour);
	$taskCell.classList.add('taskCell');
	$taskCell.dataset.weekday = weekday;
	$taskCell.dataset.datetime = datetime;
	$taskCell.addEventListener('click', () => {
		modal.open($taskCell);
	});

	if (isCurrentTime(datetime)) $taskCell.appendChild(createTimeIndicator());

	$calendarWeek.appendChild($taskCell);
}

function resetWeekCalendar() {
	resetDate();
	printCalendar();
}

function addControls() {
	$nextWeek.addEventListener('click', () => {
		const nextDate = date.getDate() + 7;
		date.setDate(nextDate);

		printCalendar();
	});

	$prevWeek.addEventListener('click', () => {
		const nextDate = date.getDate() - 7;
		date.setDate(nextDate);

		printCalendar();
	});
}

{
	/* <div class="task" tabindex="0" aria-label="de 17:00 a 18:00 hacer ejercicio">
	<p>Hacer ejercicio</p>
	<p>
		<time datetime="17:00">5</time>-<time datetime="18:00">6</time>
	</p>
</div>; */
}

export { createWeekCalendar, resetWeekCalendar };
