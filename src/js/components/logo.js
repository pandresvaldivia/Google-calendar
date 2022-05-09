import { $favicon, $logo } from '../selectors';

const day = new Date().getDate();

function setLogo() {
	$logo.src = `./assets/images/logos/calendar_${day}.png`;
}

function setFavicon() {
	$favicon.href = `./assets/favicon/calendar_${day}.ico`;
}

export { setLogo, setFavicon };
