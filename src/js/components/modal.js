export default class Modal {
	constructor($root) {
		this.root = $root;
		this.root.addEventListener('click', (e) => this.toggleModal(e));

		const taskCells = document.querySelectorAll('.taskCell');

		for (const taskCell of taskCells) {
			taskCell.addEventListener('click', () => {
				this.open(taskCell);
			});
		}
	}

	createModal(text, weekday) {
		const modal = document.createElement('dialog');
		modal.classList.add('modal');
		modal.style.marginLeft = `${this.getMargin(weekday)}px`;
		modal.innerHTML = `
            <h1>${text}</h1>
        `;
		return modal;
	}

	getMargin(weekDay) {
		const sidebarWidth = document.querySelector('.sidebar').offsetWidth;
		const timezoneWidth = document.querySelector('.timezoneCell').offsetWidth;
		const taskCellWidth = document.querySelector('.taskCell').offsetWidth;
		const position =
			16 + sidebarWidth + timezoneWidth + taskCellWidth * weekDay;
		const modalWidth = 448;

		console.log(sidebarWidth);
		console.log(timezoneWidth);
		console.log(taskCellWidth);
		console.log(position);

		return position - modalWidth;
	}

	open(taskCell) {
		if (document.querySelector('.modal')) return;

		const weekday = taskCell.dataset.weekday;
		const $modal = this.createModal('Mi modal', weekday);
		this.root.appendChild($modal);
		this.modal = $modal;
		$modal.show();
		this.toggleModal();
	}

	toggleModal(e) {
		this.createModalOverlay();

		e.preventDefault();

		if (e.target.classList.contains('modal-container')) {
			this.close();
			this.removeModalOverlay();
		}
	}

	createModalOverlay() {
		this.root.style.pointerEvents = 'auto';
	}

	removeModalOverlay() {
		this.root.style.pointerEvents = 'none';
	}

	close() {
		this.modal.remove();
	}
}
