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
		emptyWarningDivSubCategory: form.querySelector("[data-set-sub-category-new] div"),
		inputBoxSubCategory: form.querySelector("[data-set-sub-category-new] input"),
		posSignupJourneyNew: form.querySelector("#pos-signup-journey-new").value,
		emptyWarningDivPosSignupJourney: form.querySelector("[data-set-pos-signup-journey-new] div"),
		inputBoxPosSignupJourney: form.querySelector("[data-set-pos-signup-journey-new] input"),
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

function showNewTextInputs(newTextInputsOBJ) {
  newTextInputsOBJ.forEach(inputOBJ => {
    inputOBJ.select.addEventListener("change", () => {
      inputOBJ.div.style.display = inputOBJ.select.value === "Novo" ? "block" : "none";
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

function checkIfNewTextInputsAreEmpty(featureData) {
	const { subCategory, subCategoryNew, emptyWarningDivSubCategory, inputBoxSubCategory, posSignupJourney, posSignupJourneyNew , emptyWarningDivPosSignupJourney, inputBoxPosSignupJourney, contentTypeNew} = featureData;
	const emptyCheckerArray = []

	if (subCategory === "Novo" && subCategoryNew === "") {
		emptyWarningDivSubCategory.style.display = "block"
		inputBoxSubCategory.style.border = "1px solid red";
		emptyCheckerArray.push(true)
	} else {
		emptyWarningDivSubCategory.style.display = "none"
		inputBoxSubCategory.style.border = "none";
		emptyCheckerArray.push(false)
	}

	if (posSignupJourney === "Novo" && posSignupJourneyNew === "") {
		emptyWarningDivPosSignupJourney.style.display = "block"
		inputBoxPosSignupJourney.style.border = "1px solid red";
		emptyCheckerArray.push(true)
	} else {
		emptyWarningDivPosSignupJourney.style.display = "none"
		inputBoxPosSignupJourney.style.border = "none";
		emptyCheckerArray.push(false)
	}

	return emptyCheckerArray;
}

function showBoxWarningAndOpenGmail(divsArray) {
	divsArray.forEach((div) => {
		const span = div.querySelector('span')
		
		div.addEventListener('mouseover', () => {
			span.style.display = 'block';
		});
		div.addEventListener('mouseout', () => {
				span.style.display = 'none';
		});

		const emailsDivs = document.querySelectorAll('div a.email-chat')
				
		emailsDivs.forEach((email) => {
			const ariaLabel = email.getAttribute('aria-label');
			email.addEventListener('click', (event) => {
				event.preventDefault();
				window.open(ariaLabel, '_blank');
			})
		})
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

showNewTextInputs([
  {
    select: form.querySelector("#sub-category"),
    div: form.querySelector("[data-set-sub-category-new]")
  },
  {
    select: form.querySelector("#pos-signup-journey"),
    div: form.querySelector("[data-set-pos-signup-journey-new]")
  },
  {
    select: form.querySelector("#content-type"),
    div: form.querySelector("[data-set-content-type-new]")
  }
]);

showBoxWarningAndOpenGmail([
	form.querySelector("[data-set-sub-category-new]"),
	form.querySelector("[data-set-pos-signup-journey-new]")
]);

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const featureData = extractFormData(form);
	const resultsLenghtArray = [];

	formElementsAndPrefix.forEach(({ formElement, prefix }) => {
		let result = showFeatureName(prefix, featureData, event);
		const emptyCheckerArray = checkIfNewTextInputsAreEmpty(featureData)
		if(emptyCheckerArray.includes(true)) result = '';
		resultsLenghtArray.push(checkTheLengthAndSendValues(formElement, result));
	});

	if (resultsLenghtArray.every((result) => result === true)) {
		alert('Erro, o nome ultrapassou 100 caracteres, retire algumas partes opcionais ou diminua os termos!');
	}
});


