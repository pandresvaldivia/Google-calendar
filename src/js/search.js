import { getUsers } from './services/random-user.js';

export default class Search {
	constructor($container) {
		this.container = $container;
		this.input = this.container.querySelector('.search-input');
		this.options = this.container.querySelector('.searchResult-list');

		this.input.addEventListener('focus', () => this.standOutInput());
		this.input.addEventListener('focusout', () => this.standOutInput());

		this.addOptions();
	}

	standOutInput() {
		console.log(this.input);
		this.input === document.activeElement
			? this.container.classList.add('is-focused')
			: this.container.classList.remove('is-focused');
	}

	createOption(data) {
		const {
			name: { first, last },
			email,
			picture: { thumbnail },
		} = data;

		const $option = document.createElement('li');
		$option.classList.add('searchResult-option');
		$option.role = 'option';

		$option.innerHTML = `
			<div class="profile">
				<img
					src="${thumbnail}"
					alt="Foto de ${first} ${last}"
					class="profile-image"
					height="32"
					width="32"
				/>
			</div>
			<div class="searchResult-details">
				<span class="searchResult-name"
					>${first} ${last}</span
				>
				<span class="searchResult-email"
					>${email}</span
				>
			</div>
		`;

		return $option;
	}

	async addOptions() {
		const { results } = await getUsers();

		for (const userData of results) {
			const $option = this.createOption(userData);

			this.options.appendChild($option);
		}
	}
}
