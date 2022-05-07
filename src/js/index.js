import '../styles/styles.scss';

import { $searchPeople, $calendarStatus } from './selectors.js';
import Search from './search.js';
import { SHORT_OPTIONS } from './constants/date';
import { formatDate } from './helpers/date.helper';
import { createMinicalendar } from './components/mini-calendar';
import { createWeekCalendar } from './components/week-calendar';

new Search($searchPeople);

const currentDate = formatDate(new Date(), SHORT_OPTIONS);

$calendarStatus.innerText = currentDate;

createMinicalendar();
createWeekCalendar();
