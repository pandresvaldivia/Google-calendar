import '../styles/styles.scss';

import { $searchPeople } from './selectors.js';
import Search from './search.js';

const search = new Search($searchPeople);
