export default class Modal {
	constructor($root) {
		this.root = $root;
		this.root.addEventListener(
			'click',
			(e) => e.target.classList.contains('modal-container') && this.close()
		);

		const taskCells = document.querySelectorAll('.taskCell');

		for (const taskCell of taskCells) {
			taskCell.addEventListener('click', () => {
				this.open(taskCell);
			});
		}
	}

	createModal(weekday) {
		const modal = document.createElement('dialog');
		modal.classList.add('modal');
		modal.style.marginLeft = `${this.getMargin(weekday)}px`;
		modal.style.opacity = 1;
		modal.innerHTML = this.getModalTemplate();
		modal
			.querySelector('#close-modal')
			.addEventListener('click', () => this.close());
		return modal;
	}

	getModalTemplate() {
		return `
			<form class="modal-form">
				<div>
					<input type="text" name="title" class="input is-title" placeholder="Agregar título" required />
				</div>
				<div>
					<input type="date" name="date" />
					<input type="time" name="time-start" />
					<input type="time" name="time-end" />
				</div>
				<div>
					<input type="text" name="title" class="input is-solid" placeholder="Agregar invitados" />
				</div>
				<div>
					<i class="icon-video" aria-hidden="true"></i>
					<button class="button is-primary">
						Agregar una videoconferencia de Google Meet
					</button>
				</div>
				<div>
					<input type="text" name="place" class="input is-solid" placeholder="Agregar lugar" />
				</div>
				<div>
					<input type="file" name="file" class="input is-file" />
				</div>
				<div class="modal-actions">
					<button id="close-modal" class="button">
						Cancelar
					</button>
					<input type="submit" class="button is-primary" value="Guardar" />
				</div>
			</form>
		`;
	}

	getMargin(weekDay) {
		const sidebarWidth = document.querySelector('.sidebar').offsetWidth;
		const timezoneWidth = document.querySelector('.timezoneCell').offsetWidth;
		const taskCellWidth = document.querySelector('.taskCell').offsetWidth;
		const position =
			16 + sidebarWidth + timezoneWidth + taskCellWidth * weekDay;
		const modalWidth = 448;

		return position - modalWidth;
	}

	open(taskCell) {
		if (document.querySelector('.modal')) return;

		const weekday = taskCell.dataset.weekday;
		const $modal = this.createModal(weekday);
		this.root.appendChild($modal);
		this.modal = $modal;
		$modal.show();
		this.createModalOverlay();
	}

	createModalOverlay() {
		this.root.style.pointerEvents = 'auto';
	}

	removeModalOverlay() {
		this.root.style.pointerEvents = 'none';
	}

	close() {
		this.removeModalOverlay();
		this.modal.remove();
	}
}
