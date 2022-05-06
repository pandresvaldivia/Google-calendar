import { DEFAULT_OPTIONS } from '../constants/date.js';
import { capitalize } from './string.helper.js';

function formatDate(rawDate, options = DEFAULT_OPTIONS) {
	const date = new Date(rawDate).toLocaleDateString('es-ES', options);

	return capitalize(date);
}

function formatDateToNum(date) {
	return date.toLocaleDateString('en-CA');
}

export { formatDate, formatDateToNum };
