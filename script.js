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

function showFeatureName(prefix, featureData) {
	const { office, type, category, subCategory, posSignupJourney, contentType, emailPsychology, funnel, subCategoryNew, posSignupJourneyNew, contentTypeNew } = featureData;

	let result = `${prefix}${office}_${type}_${category}`;

	result += subCategory === "Novo" ? `_${subCategoryNew}` : `_${subCategory}`;
	result += posSignupJourney === "Novo" ? `_${posSignupJourneyNew}` : `_${posSignupJourney}`;
	result += contentType === "Novo" ? `_${contentTypeNew}` : (contentType !== "" ? `_${contentType}` : "");
	result += emailPsychology !== "" ? `_${emailPsychology}` : "";
	result += funnel !== "" ? `_${funnel}` : "";

	return result.toUpperCase().trim().replaceAll(" ", "-");
}

function hideOrShowNewTextInputs(newTextInputsOBJ) {
  newTextInputsOBJ.forEach(inputOBJ => {
    inputOBJ.select.addEventListener("change", () => {
      inputOBJ.div.style.display = inputOBJ.select.value === "Novo" ? "block" : "none";
    });
  });
}

const form = document.querySelector("#signup");
const campaignNameValid = true;

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

form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (campaignNameValid) {
		const featureData = extractFormData(form);
		const checkResults = [];
		formElementsAndPrefix.forEach(({ formElement, prefix }) => {
			const result = showFeatureName(prefix, featureData);
			checkResults.push(checkTheLengthAndSendValues(formElement, result));
		});
		if (checkResults.every((result) => result === true)) {
			alert('Erro, o nome ultrapassou 100 caracteres, retire algumas partes opcionais ou diminua os termos!');
		}
	}
});

function checkTheLengthAndSendValues(formElement, value) {
  if (value.length >= 100) {
    return true;
  } else {
		form.elements[formElement].value = value;
		return false;
	}
}

hideOrShowNewTextInputs([
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




form.addEventListener('click', () => {
    subCategoryNewSpan.style.display = 'none';
    posSignupJourneyNewSpan.style.display = 'none';
    contentTypeNewSpan.style.display = 'none';
});


const subCategoryNewSpan = document.querySelector('[data-set-sub-category-new] span');
const subCategoryNew = form.querySelector("#sub-category-new");
let isMouseOverSpan = false;
const emailLink = document.querySelector('#email-link');
subCategoryNew.addEventListener('mouseover',  () => {
    subCategoryNewSpan.style.display = 'block';
});
subCategoryNew.addEventListener('mouseout', () => {
    if (!isMouseOverSpan) {
        subCategoryNewSpan.style.display = 'none';
    }
});
subCategoryNew.addEventListener('mouseover', () => {
    isMouseOverSpan = true;
});
emailLink.addEventListener('mouseover', () => {
    subCategoryNewSpan.style.display = 'block';
});
emailLink.addEventListener('mouseout', () => {
    isMouseOverSpan = false;
    subCategoryNewSpan.style.display = 'none';
});
subCategoryNewSpan.addEventListener('mouseover', () => {
    isMouseOverSpan = true;
    subCategoryNewSpan.style.display = 'block';
});
subCategoryNewSpan.addEventListener('mouseout', () => {
    isMouseOverSpan = false;
    subCategoryNewSpan.style.display = 'none';
});
emailLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.open('https://mail.google.com/chat/u/0/#chat/dm/7hEiL4AAAAE', '_blank');

});



const posSignupJourneyNewSpan = document.querySelector('[data-set-pos-signup-journey-new] span');
const posSignupJourneyNew = form.querySelector("#pos-signup-journey-new");
let isMouseOverSpan2 = false;
const emailLink2 = document.querySelector('#email-link');
posSignupJourneyNew.addEventListener('mouseover',  () => {
    posSignupJourneyNewSpan.style.display = 'block';
});
posSignupJourneyNew.addEventListener('mouseout', () => {
    if (!isMouseOverSpan2) {
        posSignupJourneyNewSpan.style.display = 'none';
    }
});
posSignupJourneyNew.addEventListener('mouseover', () => {
    isMouseOverSpan2 = true;
});
emailLink2.addEventListener('mouseover', () => {
    posSignupJourneyNewSpan.style.display = 'block';
});
emailLink2.addEventListener('mouseout', () => {
    isMouseOverSpan2 = false;
    posSignupJourneyNewSpan.style.display = 'none';
});
posSignupJourneyNewSpan.addEventListener('mouseover', () => {
    isMouseOverSpan2 = true;
    posSignupJourneyNewSpan.style.display = 'block';
});
posSignupJourneyNewSpan.addEventListener('mouseout', () => {
    isMouseOverSpan2 = false;
    posSignupJourneyNewSpan.style.display = 'none';
});
emailLink2.addEventListener('click', (event) => {
    event.preventDefault();
    window.open('https://mail.google.com/chat/u/0/#chat/dm/7hEiL4AAAAE', '_blank');

});





const contentTypeNewSpan = document.querySelector('[data-set-content-type-new] span');
const contentTypeNew = form.querySelector("#content-type-new");
let isMouseOverSpan3 = false;
const emailLink3 = document.querySelector('#email-link');
contentTypeNew.addEventListener('mouseover',  () => {
    contentTypeNewSpan.style.display = 'block';
});
contentTypeNew.addEventListener('mouseout', () => {
    if (!isMouseOverSpan3) {
        contentTypeNewSpan.style.display = 'none';
    }
});
contentTypeNew.addEventListener('mouseover', () => {
    isMouseOverSpan3 = true;
});
emailLink3.addEventListener('mouseover', () => {
    contentTypeNewSpan.style.display = 'block';
});
emailLink3.addEventListener('mouseout', () => {
    isMouseOverSpan3 = false;
    contentTypeNewSpan.style.display = 'none';
});
contentTypeNewSpan.addEventListener('mouseover', () => {
    isMouseOverSpan3 = true;
    contentTypeNewSpan.style.display = 'block';
});
contentTypeNewSpan.addEventListener('mouseout', () => {
    isMouseOverSpan3 = false;
    contentTypeNewSpan.style.display = 'none';
});
emailLink3.addEventListener('click', (event) => {
    event.preventDefault();
    window.open('https://mail.google.com/chat/u/0/#chat/dm/7hEiL4AAAAE', '_blank');

});