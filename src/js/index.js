import '../styles/styles.scss';

import {
	$searchPeople,
	$modalContainer,
	$calendarStatus,
} from './selectors.js';
import Modal from './components/modal.js';
import Search from './search.js';
import { SHORT_OPTIONS } from './constants/date';
import { formatDate } from './helpers/date.helper';
import { createMinicalendar } from './components/mini-calendar';

new Search($searchPeople);
new Modal($modalContainer);

const currentDate = formatDate(new Date(), SHORT_OPTIONS);

$calendarStatus.innerText = currentDate;

createMinicalendar();
