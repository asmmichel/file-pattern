	// show a message with a type of the input
	function showMessage(input, message, type) {
		// get the small element and set the message
		const msg = input.parentNode.querySelector("small");
		msg.innerText = message;
		// update the class for the input
		input.className = type ? "form-control" : "form-control is-invalid";
		return type;
	}
	function showError(input, message) {
		return showMessage(input, message, false);
	}
	function showSuccess(input) {
		return showMessage(input, "", true);
	}
	function hasValue(input, message) {
		if (input.value.trim() === "") {
			return showError(input, message);
		}
		return showSuccess(input);
	}



function showFeatureName(prefix, newInputsOBJ, event) {
	let result = `${prefix}`;

	newInputsOBJ.forEach(obj => {
		const { select, newDiv } = obj;
		const onlyDropdown = 					select.classList.contains('only-dropdown');
		const newInput = 							select.classList.contains('new-input');
		const newInputOptional = 			select.classList.contains('new-input-optional');
		const onlyDropdownOptional = 	select.classList.contains('only-dropdown-optional');
		const hasNewDiv = obj.hasOwnProperty('newDiv');
		const valueIsNew = 				(select.value === "Novo")
		const valueIsNotNew = 		(select.value !== "Novo")
		const valueIsNotEmpty = 	(select.value !== "")

		if (onlyDropdown) result += `${select.value}_`;

		if (hasNewDiv) {
			const newDivValue = newDiv.querySelector("input").value;
			const newDivValueEmpty = (newDivValue === "");
			if (newInput) {
				if (valueIsNotNew) 		result += `${select.value}_`;
				else if (valueIsNew) 	result += `${newDivValue}_`;
			}
			if (newInputOptional) {
				if (valueIsNotEmpty && valueIsNotNew) 		result += `${select.value}_`;
				else if (valueIsNew) 											result += `${newDivValue}_`;
				else if (valueIsNew && newDivValueEmpty) 	result = result.slice(0, -1);
			}
		}

		if (onlyDropdownOptional) {
			if (valueIsNotEmpty) result += `${select.value}_`;
		}
	});

	result = result.replace(/_+$/, "");

	if(event.submitter.name === 'date') return showFeatureNameWithDate(result);

	return result.toUpperCase().trim().replaceAll(" ", "-");
}

function showFeatureNameWithDate(result) {
	const date = new Date();
	const year = String(date.getFullYear()).slice(-2);
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	result += `-${year}${month}${day}`;
	return result.toUpperCase().trim().replaceAll(" ", "-");
}

function showNewTextInputs(newInputsOBJ) {
	newInputsOBJ.forEach(obj => {
		if(obj.hasOwnProperty('newDiv')) {
			obj.select.addEventListener("change", () => {
				obj.newDiv.style.display = obj.select.value === "Novo" ? "block" : "none";
			});
		}
	});
}

function checkTheLengthAndSendValues(formElement, result) {
	if (result.length >= 100) {
		return true;
	} else {
		form.elements[formElement].value = result;
		return false;
	}
}

function checkIfNewTextInputsAreEmpty(newInputsOBJ) {
	const emptyCheckerArray = []
	newInputsOBJ.forEach((obj) => {
		if(obj.hasOwnProperty('newDiv')) {
			const { select, newDiv } = obj;
			const emptyWarningDiv = newDiv.querySelector('.empty-warning')
			const newDivInput = newDiv.querySelector('.never-empty');
			if(emptyWarningDiv && newDivInput !== null) {
				if (select.value === "Novo" && newDivInput.value === "") {
					emptyWarningDiv.style.display = "block"
					newDivInput.style.border = "1px solid red";
					emptyCheckerArray.push(true)
				} else {
					emptyWarningDiv.style.display = "none"
					newDivInput.style.border = "none";
					emptyCheckerArray.push(false)
				}
			}
		}
	})
	return emptyCheckerArray;
}

function showBoxWarningAndOpenGmail(newInputsOBJ) {
	newInputsOBJ.forEach((obj) => {
		if(obj.hasOwnProperty('newDiv')) {
			const { newDiv } = obj;
			const span = newDiv.querySelector('span')
			if(span !== null) {
				newDiv.addEventListener('mouseover', () => span.style.display = 'block');
				newDiv.addEventListener('mouseout', () => span.style.display = 'none');
		
				const emailsDivs = newDiv.querySelectorAll('a.email-chat')
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

const form = document.querySelector("#signup");

const formElementsAndPrefix = [
	{
		formElement: "emailNameResult",
		prefix: ""
	},
	{
		formElement: "deNameResult",
		prefix: "DE_"
	},
	{
		formElement: "filterNameResult",
		prefix: "FILTER_"
	},
	{
		formElement: "sqlNameResult",
		prefix: "SQL_"
	},
	{
		formElement: "automationNameResult",
		prefix: "AUT_"
	},
	{
		formElement: "importNameResult",
		prefix: "IMPORT_"
	},
	{
		formElement: "dataExtractNameResult",
		prefix: "DATA_EXT_"
	},
	{
		formElement: "fileTransferNameResult",
		prefix: "FT_"
	}
];

const newInputsOBJ = [
	{
		select: form.querySelector("#office")
	},
	{
		select: form.querySelector("#type")
	},
	{
		select: form.querySelector("#category")
	},
	{
		select: form.querySelector("#sub-category"),
		newDiv: form.querySelector("[data-set-sub-category-new]")
	},
	{
		select: form.querySelector("#pos-signup-journey"),
		newDiv: form.querySelector("[data-set-pos-signup-journey-new]")
	},
	{
		select: form.querySelector("#content-type"),
		newDiv: form.querySelector("[data-set-content-type-new]")
	},
	{
		select: form.querySelector("#email-psychology")
	},
	{
		select: form.querySelector("#funnel")
	},
];

showBoxWarningAndOpenGmail(newInputsOBJ);

showNewTextInputs(newInputsOBJ)	

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const resultsLenghtArray = [];
	
	formElementsAndPrefix.forEach(({ formElement, prefix }) => {
		//nova linha aqui - feature removerExtract
		let result = showFeatureName(prefix, newInputsOBJ, event);
		//
		const emptyCheckerArray = checkIfNewTextInputsAreEmpty(newInputsOBJ)
		if(emptyCheckerArray.includes(true)) result = '';
		resultsLenghtArray.push(checkTheLengthAndSendValues(formElement, result));
	});

	if (resultsLenghtArray.every((result) => result === true)) {
		alert('Erro, o nome ultrapassou 100 caracteres, retire algumas partes opcionais ou diminua os termos!');
	}
});
	