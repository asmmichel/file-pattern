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
	
	
	
	function extractFormData(form) {
		return {
			office: form.querySelector("#office").value,
			type: form.querySelector("#type").value,
			category: form.querySelector("#category").value,
			subCategory: form.querySelector("#sub-category").value,
			posSignupJourney: form.querySelector("#pos-signup-journey").value,
			contentType: form.querySelector("#content-type").value,
			emailPsychology: form.querySelector("#email-psychology").value,
			funnel: form.querySelector("#funnel").value,
			subCategoryNew: form.querySelector("#sub-category-new").value,
			posSignupJourneyNew: form.querySelector("#pos-signup-journey-new").value,
			contentTypeNew: form.querySelector("#content-type-new").value
		};
	}

	function showFeatureName(prefix, featureData, event) {
		const { office, type, category, subCategory, posSignupJourney, contentType, emailPsychology, funnel, subCategoryNew, posSignupJourneyNew, contentTypeNew } = featureData;
	
		let result = `${prefix}${office}_${type}_${category}`;
	
		if (subCategory === "Novo")  result += `_${subCategoryNew}` 
		else result += `_${subCategory}`;
	
		if (posSignupJourney === "Novo") result += `_${posSignupJourneyNew}`;
		else	result += `_${posSignupJourney}`;
	
		if (contentType === "Novo") result += `_${contentTypeNew}`;
		else if (contentType !== "") result += `_${contentType}`;
	
		if (contentType === "Novo" && contentTypeNew === "")  result = result.slice(0, -1);
	
		if (emailPsychology !== "") result += `_${emailPsychology}`;
		
		if (funnel !== "") result += `_${funnel}`;
	
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
			obj.select.addEventListener("change", () => {
				obj.newDiv.style.display = obj.select.value === "Novo" ? "block" : "none";
			});
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
		})
		return emptyCheckerArray;
	}

	function showBoxWarningAndOpenGmail(newInputsOBJ) {
		newInputsOBJ.forEach((obj) => {
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
	];

	showBoxWarningAndOpenGmail(newInputsOBJ);

	showNewTextInputs(newInputsOBJ)	

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const featureData = extractFormData(form);
		const resultsLenghtArray = [];
		
		formElementsAndPrefix.forEach(({ formElement, prefix }) => {
			let result = showFeatureName(prefix, featureData, event);
			const emptyCheckerArray = checkIfNewTextInputsAreEmpty(newInputsOBJ)
			if(emptyCheckerArray.includes(true)) result = '';
			resultsLenghtArray.push(checkTheLengthAndSendValues(formElement, result));
		});
	
		if (resultsLenghtArray.every((result) => result === true)) {
			alert('Erro, o nome ultrapassou 100 caracteres, retire algumas partes opcionais ou diminua os termos!');
		}
	});
	