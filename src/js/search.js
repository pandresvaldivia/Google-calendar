import { getUsers } from './services/random-user.js';

function standOutInput(e) {
	const $searchInput = e.target;

	$searchInput === document.activeElement
		? $searchInput.parentElement.classList.add('is-focused')
		: $searchInput.parentElement.classList.remove('is-focused');
}

export { standOutInput };
