import '../styles/styles.scss';

import { $searchPeople, $modalContainer } from './selectors.js';
import Modal from './components/modal.js';
import Search from './search.js';

const search = new Search($searchPeople);
const modal = new Modal($modalContainer);
