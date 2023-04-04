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
	function showFeatureName(feature, featureData) {
    const { office, type, category, subCategory, posSignupJourney, contentType, emailPsychology, funnel, subCategoryNew, posSignupJourneyNew, contentTypeNew } = featureData;

    if (feature === "EMAIL") {
        let result = `${office}_${type}_${category}`;

        result += subCategory === "Novo" ? `_${subCategoryNew}` : `_${subCategory}`;
        result += posSignupJourney === "Novo" ? `_${posSignupJourneyNew}` : `_${posSignupJourney}`;
        result += contentType === "Novo" ? `_${contentTypeNew}` : (contentType !== "" ? `_${contentType}` : "");
        result += emailPsychology !== "" ? `_${emailPsychology}` : "";
        result += funnel !== "" ? `_${funnel}` : "";

        return result.toUpperCase().trim().replaceAll(" ", "-");
    }
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

const form = document.querySelector("#signup");
const campaignNameValid = true;

form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (campaignNameValid) {
		const featureData = extractFormData(form);
		form.elements["emailNameResult"].value = showFeatureName("EMAIL", featureData);
	}
});


function hideOrShowNewTextInputs(newTextInputsOBJ) {
  newTextInputsOBJ.forEach(inputOBJ => {
    inputOBJ.select.addEventListener("change", () => {
      inputOBJ.div.style.display = inputOBJ.select.value === "Novo" ? "block" : "none";
    });
  });
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
