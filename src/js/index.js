import '../styles/styles.scss';

import { $searchPeople, $calendarStatus, $todayBtn } from './selectors.js';
import Search from './search.js';
import { DEFAULT_OPTIONS, SHORT_OPTIONS } from './constants/date';
import { formatDate } from './helpers/date.helper';
import {
	createMinicalendar,
	resetMinicalendar,
} from './components/mini-calendar';
import {
	createWeekCalendar,
	resetWeekCalendar,
} from './components/week-calendar';
import { setFavicon, setLogo } from './components/logo';

new Search($searchPeople);

const currentDate = formatDate(new Date(), SHORT_OPTIONS);

$calendarStatus.innerText = currentDate;
$todayBtn.title = formatDate(new Date(), DEFAULT_OPTIONS);
$todayBtn.addEventListener('click', () => {
	resetMinicalendar();
	resetWeekCalendar();
});

createMinicalendar();
createWeekCalendar();
setLogo();
setFavicon();
