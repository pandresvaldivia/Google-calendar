import { formatDate, formatDateToNum } from '../helpers/date.helper.js';
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
		if (weekday < 2) modal.classList.add('is-reverse');
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
							<span class="inputDate-value"></span>
							<input id="modal-date" class="inputDate-input" type="date" name="date" required />
						</span>
						<input id="time-start" class="inputTime" type="time" name="time-start" value="09:00" required/>
						<span aria-label="a">-</span>
						<input id="time-end" class="inputTime" type="time" name="time-end" value="18:00" required/>
					</div>
				</div>
				<div class="modal-input">
					<i class="icon-users" aria-hidden="true"></i>
					<input type="text" name="title" class="input is-solid" placeholder="Agregar invitados" required />
				</div>
				<div class="modal-input">
					<i class="icon-video" aria-hidden="true"></i>
					<button class="button is-primary is-videocall">
						Agregar una videoconferencia de Google Meet
					</button>
				</div>
				<div class="modal-input">
					<i class="icon-gps" aria-hidden="true"></i>
					<input type="text" name="place" class="input is-solid" placeholder="Agregar lugar" required />
				</div>
				<div class="modal-input">
					<i class="icon-text" aria-hidden="true"></i>
					<div class="input is-file">
						<label for="file" class="input-value">Agregar descripción o archivo adjunto</label>
						<input type="file" name="file" class="input is-hidden" required />
					</div>
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
		const baseWidth = sidebarWidth + timezoneWidth + taskCellWidth * weekDay;

		if (weekDay < 2) {
			return baseWidth + taskCellWidth + 20;
		}

		const position = 16 + baseWidth;
		const modalWidth = 448;

		return position - modalWidth;
	}

	addDateElements(modal) {
		const modalDate = modal.querySelector('#modal-date');
		const inputDateValue = modal.querySelector('.inputDate-value');

		modalDate.value = formatDateToNum(new Date());
		inputDateValue.innerText = formatDate(Date.now());

		modalDate.addEventListener('input', () => {
			const date = formatDate(modalDate.value);

			inputDateValue.innerText = date;
		});
	}

	addFileElements(modal) {
		const fileInput = modal.querySelector('.input.is-file');
		const fileInputValue = modal.querySelector('.input-value');

		fileInput.addEventListener('change', (e) => {
			const filename = e.target.files[0].name;

			fileInputValue.classList.add('is-full');
			fileInputValue.innerText = filename;
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
		this.addFileElements($modal);
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
