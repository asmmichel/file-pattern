class FilePattern {
	constructor(form) {
		this.form = document.querySelector(form);
		this.inputsOBJ = [
			{
				select: this.form.querySelector('#customer-type')
			},
			{
				select: this.form.querySelector('#sales-cycle-stage')
			},
			{
				select: this.form.querySelector('#customer-interest')
			},
			{
				select: this.form.querySelector('#lead-source'),
				newDiv: this.form.querySelector('.lead-source-new')
			},
			{
				select: this.form.querySelector('#related-event'),
				newDiv: this.form.querySelector('.related-event-new')
			},
			{
				select: this.form.querySelector('#product-category'),
				newDiv: this.form.querySelector('.product-category-new')
			},
			{
				select: this.form.querySelector('#engagement-level')
			},
			{
				select: this.form.querySelector('#time-sensitivity')
			},
			{
				select: this.form.querySelector('#sales-rep')
			},
		];
		this.formElementsAndPrefix = [
			{
				formElement: 'documentNameResult',
				prefix: 'DOC_'
			},
			{
				formElement: 'imageNameResult',
				prefix: 'IMG_'
			},
			{
				formElement: 'gifNameResult',
				prefix: 'GIF_'
			},
			{
				formElement: 'videoNameResult',
				prefix: 'VID_'
			},
			{
				formElement: 'tableNameResult',
				prefix: 'TAB_'
			},
			{
				formElement: 'emailNameResult',
				prefix: 'EML_'
			},
			{
				formElement: 'podcastNameResult',
				prefix: 'POD_'
			},
			{
				formElement: 'infographicNameResult',
				prefix: 'INF_'
			},
		];
	}

	showBoxWarningAndOpenGmail() {
		this.inputsOBJ.forEach((obj) => {
			if(obj.hasOwnProperty('newDiv')) {
				const { newDiv } = obj;
				const span = newDiv.querySelector('span');
				if(span !== null) {
					newDiv.addEventListener('mouseover', () => span.style.display = 'block');
					newDiv.addEventListener('mouseout', () => span.style.display = 'none');

					const emailsDivs = newDiv.querySelectorAll('a.email-chat');
					emailsDivs.forEach((email) => {
						const ariaLabel = email.getAttribute('aria-label');
						email.addEventListener('click', (event) => {
							event.preventDefault();
							window.open(ariaLabel, '_blank');
						})
					})
				}
			}
		})
	}

	showNewTextInputs() {
		this.inputsOBJ.forEach(obj => {
			if(obj.hasOwnProperty('newDiv')) {
				obj.select.addEventListener('change', () => {
					if (obj.select.value === 'Novo') obj.newDiv.style.display = 'block';
					else obj.newDiv.style.display = 'none';
				});
			}
		});
	}

	showFeatureName(event, index) {
		let result = `${this.formElementsAndPrefix[index].prefix}`;
	
		this.inputsOBJ.forEach(obj => {
			const { select, newDiv } = obj;
			const onlyDropdown = 					select.classList.contains('only-dropdown');
			const newInput = 							select.classList.contains('new-input');
			const newInputOptional = 			select.classList.contains('new-input-optional');
			const onlyDropdownOptional = 	select.classList.contains('only-dropdown-optional');
			const textOptional = 					select.classList.contains('text-optional');
			const hasNewDiv = obj.hasOwnProperty('newDiv');
			const valueIsNew = 				(select.value === 'Novo');
			const valueIsNotNew = 		(select.value !== 'Novo');
			const valueIsNotEmpty = 	(select.value !== '');
	
			if (onlyDropdown) result += `${select.value}_`;
	
			if (hasNewDiv) {
				const newDivValue = newDiv.querySelector('input').value;
				const newDivValueEmpty = (newDivValue === '');
				if (newInput) {
					if (valueIsNotNew) 		result += `${select.value}_`;
					else if (valueIsNew) 	result += `${newDivValue}_`;
				}
				if (newInputOptional) {
					if (valueIsNotEmpty && valueIsNotNew) 		result += `${select.value}_`;
					else if (valueIsNew && newDivValueEmpty) 	result = result.replace(/_+$/, '_');
					else if (valueIsNew) 											result += `${newDivValue}_`;
				}
			}
	
			if (onlyDropdownOptional) {
				if (valueIsNotEmpty) result += `${select.value}_`;
			}

			if (textOptional) {
				if (valueIsNotEmpty) result += `${select.value}_`;
			}
		});
		
		result = result.replace(/_+$/, '');
	
		if(event.submitter.name === 'date') return this.showFeatureNameWithDate(result);
	
		return result.toUpperCase().trim().replaceAll(' ', '-');
	}
	
	showFeatureNameWithDate(result) {
		const date = new Date();
		const day = String(date.getDate()).padStart(2, '0');
		const month = date.toLocaleString('en-US', { month: 'long' });
		const year = String(date.getFullYear());
		result += `-${day}${month}${year}`;
		return result.toUpperCase().trim().replaceAll(' ', '-');
	}
	
	checkIfNewTextInputsAreEmpty() {
		const emptyCheckerArray = [];
		this.inputsOBJ.forEach((obj) => {
			if(obj.hasOwnProperty('newDiv')) {
				const { select, newDiv } = obj;
				const emptyWarningDiv = newDiv.querySelector('.empty-warning');
				const newDivInput = newDiv.querySelector('.never-empty');

				if(emptyWarningDiv && newDivInput !== null) {
					if (select.value === 'Novo' && newDivInput.value === '') {
						emptyWarningDiv.style.display = 'block';
						newDivInput.style.border = '1px solid red';
						emptyCheckerArray.push(true);
					} else {
						emptyWarningDiv.style.display = 'none';
						newDivInput.style.border = '1px solid white';
						emptyCheckerArray.push(false);
					}
				}
			}
		})
		return emptyCheckerArray;
	}
	
	checkTheLengthAndSendValues(result, index) {
		if (result.length >= 100) return true;
		else this.form.elements[ this.formElementsAndPrefix[index].formElement].value = result; return false;
	}

	init() {
		this.showBoxWarningAndOpenGmail();
		this.showNewTextInputs();
		this.form.addEventListener('submit', (event) => {
			event.preventDefault();
			const resultsLenghtArray = [];
			this.formElementsAndPrefix.forEach((element, index) => {
				let result = this.showFeatureName(event, index);
				const emptyCheckerArray = this.checkIfNewTextInputsAreEmpty();
				if(emptyCheckerArray.includes(true)) result = '';
				resultsLenghtArray.push(this.checkTheLengthAndSendValues(result, index));
			});
			if (resultsLenghtArray.every((result) => result === true)) {
				alert('Erro, o nome ultrapassou 100 caracteres, retire algumas partes opcionais ou diminua os termos!');
			}
		});
	}
}

new FilePattern('#signup').init();