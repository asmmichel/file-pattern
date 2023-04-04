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

	// show email name in input result
	function showFeatureName(feature, office, type, category, subCategory, posSignupJourney, contentType, emailPsychology, funnel, subCategoryNew, posSignupJourneyNew, contentTypeNew) {

		if (feature == "EMAIL"){
			let result = office + "_" + type + "_" + category;
			if (subCategory == "Novo") {
				result += "_" + subCategoryNew;
			} else {
				result += "_" + subCategory;
			}
			if (posSignupJourney == "Novo") {
				result += "_" + posSignupJourneyNew;
			} else {
				result += "_" + posSignupJourney;
			}
			if (contentType == "Novo") {
				result += "_" + contentTypeNew;
			}
			if (contentType !== "" && contentType !== "Novo") {
				result += "_" + contentType;
			}
			if (emailPsychology !== "") {
				result += "_" + emailPsychology;
			}
			if (funnel !== "") {
				result += "_" + funnel;
			}
			return result.toUpperCase().trim().replaceAll(" ", "-");
		}

	}
	
	const form = document.querySelector("#signup");
	const campaignNameValid = true;

	form.addEventListener("submit", function (event) {
		// stop form submission
		event.preventDefault();

		// if valid, submit the form.
		if (campaignNameValid) {
			let office = form.querySelector("#office").value;
			let type = form.querySelector("#type").value;
			let category = form.querySelector("#category").value;
			let subCategory = form.querySelector("#sub-category").value;
			let posSignupJourney = form.querySelector("#pos-signup-journey").value;
			let contentType = form.querySelector("#content-type").value;
			let emailPsychology = form.querySelector("#email-psychology").value;
			let funnel = form.querySelector("#funnel").value;
			let subCategoryNew = form.querySelector("#sub-category-new").value;
			let posSignupJourneyNew = form.querySelector("#pos-signup-journey-new").value;
			let contentTypeNew = form.querySelector("#content-type-new").value;

			//returning the responses
			form.elements["emailNameResult"].value = showFeatureName("EMAIL", office, type, category, subCategory, posSignupJourney, contentType, emailPsychology, funnel, subCategoryNew, posSignupJourneyNew, contentTypeNew);
		}
	});

let subCategoryNewDIV = form.querySelector("[data-set-sub-category-new]");
let subCategorySelect = form.querySelector("#sub-category");

let posSignupJourneyNewDIV = form.querySelector("[data-set-pos-signup-journey-new]");
let posSignupJourneySelect = form.querySelector("#pos-signup-journey");

let contentTypeNewDIV = form.querySelector("[data-set-content-type-new]");
let contentTypeSelect = form.querySelector("#content-type");


subCategorySelect.addEventListener("change", function() {
if (subCategorySelect.value === "Novo") {
	subCategoryNewDIV.style.display = "block";
} else {
	subCategoryNewDIV.style.display = "none";
}
});

posSignupJourneySelect.addEventListener("change", function() {
if (posSignupJourneySelect.value === "Novo") {
	posSignupJourneyNewDIV.style.display = "block";
} else {
	posSignupJourneyNewDIV.style.display = "none";
}
});

contentTypeSelect.addEventListener("change", function() {
if (contentTypeSelect.value === "Novo") {
	contentTypeNewDIV.style.display = "block";
} else {
	contentTypeNewDIV.style.display = "none";
}
});
