import '../styles/styles.scss';

import { $searchPeople, $modalContainer } from './selectors.js';
import Modal from './components/modal.js';
import Search from './search.js';

new Search($searchPeople);
new Modal($modalContainer);
