import '../styles/main.css';
import '../styles/icons.css';
import '../styles/page.css';
import '../styles/task.css';
import '../styles/task-cell.css';
import '../styles/calendar.css';
import '../styles/calendar-day.css';
import '../styles/timezone-cell.css';
import '../styles/hour-cell.css';
import '../styles/current-time.css';
import '../styles/button.css';
import '../styles/select.css';
import '../styles/calendar-status.css';
import '../styles/header.css';
import '../styles/profile.css';
import '../styles/mini-calendar.css';
import '../styles/search.css';

import { $searchInputs } from './selectors.js';
import { standOutInput } from './search.js';

for (const $search of $searchInputs) {
	$search.addEventListener('focus', standOutInput);
	$search.addEventListener('focusout', standOutInput);
}
