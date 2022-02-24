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
import '../styles/search-result.css';

import { $searchPeople } from './selectors.js';
import Search from './search.js';

const search = new Search($searchPeople);
