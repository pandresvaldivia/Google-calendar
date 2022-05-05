import { defaultOptions } from '../constants/date.js';
import { capitalize } from './string.helper.js';

function formatDate(rawDate, options = defaultOptions) {
	const date = new Date(rawDate).toLocaleDateString('es-ES', options);

	return capitalize(date);
}

function formatDateToNum(date) {
	return date.toLocaleDateString('en-CA');
}

export { formatDate, formatDateToNum };
