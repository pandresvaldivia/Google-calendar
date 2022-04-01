import { formatDate } from '../utils/date.js';
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
				<div class="modal-input">
					<i class="icon-clock" aria-hidden="true"></i>
					<div class="modal-Datetime">
						<span class="inputDate">
							<span class="inputDate-value">
								Martes, 5 de abril de 2022
							</span>
							<input id="modal-date" class="inputDate-input" type="date" name="date" />
						</span>
						<input id="time-start" class="inputTime" type="time" name="time-start" value="09:00"/>
						<span aria-label="a">-</span>
						<input id="time-end" class="inputTime" type="time" name="time-end" value="18:00"/>
					</div>
				</div>
				<div class="modal-input">
					<i class="icon-users" aria-hidden="true"></i>
					<input type="text" name="title" class="input is-solid" placeholder="Agregar invitados" />
				</div>
				<div class="modal-input">
					<i class="icon-video" aria-hidden="true"></i>
					<button class="button is-primary is-videocall">
						Agregar una videoconferencia de Google Meet
					</button>
				</div>
				<div class="modal-input">
					<i class="icon-gps" aria-hidden="true"></i>
					<input type="text" name="place" class="input is-solid" placeholder="Agregar lugar" />
				</div>
				<div class="modal-input">
					<i class="icon-text" aria-hidden="true"></i>
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

	addDateElements(modal) {
		this.modalDate = modal.querySelector('#modal-date');
		this.timeStart = modal.querySelector('#time-start');
		this.timeEnd = modal.querySelector('#time-end');

		this.addEventListeners();
	}

	addEventListeners() {
		this.modalDate.addEventListener('input', () => {
			const date = formatDate(this.modalDate.value);

			console.log(date);
		});
	}

	open(taskCell) {
		if (document.querySelector('.modal')) return;

		const weekday = taskCell.dataset.weekday;
		const $modal = this.createModal(weekday);
		this.root.appendChild($modal);
		this.modal = $modal;
		$modal.show();
		this.addDateElements($modal);
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
