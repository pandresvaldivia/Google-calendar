import { defaultOptions } from '../constants/date.js';

function formatDate(rawDate, options = defaultOptions) {
	const date = new Date(rawDate).toLocaleDateString('es-ES', options);

	return date;
}

export { formatDate };
