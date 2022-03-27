import '../styles/styles.scss';

import Modal from './components/modal.js';
import { $searchPeople, $modalContainer, $body } from './selectors.js';
import Search from './search.js';

const search = new Search($searchPeople);
// $modal.show();

const modal = new Modal($modalContainer);
