import { getUsers } from './services/random-user.js';

export default class Search {
	constructor($container) {
		this.container = $container;
		this.input = this.container.querySelector('.search-input');
		this.options = this.container.querySelector('.searchResult-list');
		this.optionsList = [];

		this.input.addEventListener('focus', () => this.standOutInput());
		this.input.addEventListener('focusout', () => this.standOutInput());
		this.input.addEventListener('input', (e) =>
			this.filterOptions(e.target.value)
		);

		this.addOptions();
	}

	standOutInput() {
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

			this.optionsList.push($option);
		}

		this.printOptions(this.optionsList);
	}

	printOptions(optionsList) {
		this.clear();

		for (const $option of optionsList) {
			this.options.appendChild($option);
		}
	}

	filterOptions(searchInput) {
		const results = this.optionsList.filter((option) =>
			option.innerText.toLowerCase().includes(searchInput.toLowerCase())
		);

		this.printOptions(results);
	}

	clear() {
		while (this.options.firstElementChild) {
			this.options.firstElementChild.remove();
		}
	}
}
