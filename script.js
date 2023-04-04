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
		function showFeatureName(feature, country, type, team, campaignName) {

			if (feature == "EMAIL"){
				// get the small element and set the message
				const result = country + "_" + type + "_" + team + "-" + campaignName
				return result.toUpperCase();
			}
		}
    
		const form = document.querySelector("#signup");
		const CAMPAIGN_REQUIRED = "Please enter your campaign name";

		form.addEventListener("submit", function (event) {
			// stop form submission
			event.preventDefault();
			// validate the form
			let campaignNameValid = hasValue(form.elements["campaign-name"], CAMPAIGN_REQUIRED);
			// if valid, submit the form.
			if (campaignNameValid) {
				let country = form.querySelector("#country").value;
				let team = form.querySelector("#team").value;
				let campaignName = form.elements["campaign-name"].value.trim().replace("_", "-").replace(" ", "-");
				let type = form.querySelector("#type").value;
				//returning the responses
				form.elements["emailNameResult"].value = showFeatureName("EMAIL", country, type, team, campaignName);
			}
		});
