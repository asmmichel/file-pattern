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
		function validateCampaign(input, requiredMsg, invalidMsg) {
			// check if the value is not empty
			if (!hasValue(input, requiredMsg)) {
				return false;
			}

			// validate email format
			const emailRegex =
				/([^<>()\[\]\\.,;:\s@"])/;

			const email = input.value.trim();
			if (!emailRegex.test(email)) {
				return showError(input, invalidMsg);
			}
			return true;
		}
		// show email name in input result
		function showFeatureName(feature, country, type, team, campaignName) {

			if (feature == "EMAIL"){
				// get the small element and set the message
				const result = country + "_" + type + "_" + team + "-" + campaignName
				return result.toUpperCase();
			}
			else if (feature == "DE"){
				// get the small element and set the message
				const result = "TB_" + country.replace("-","_") + "_" + type + "_" + team + "_" + campaignName.replace("-","_").replace(" ","_")
				return result.toUpperCase();
			}
			else if (feature == "FILTER"){
				// get the small element and set the message
				const result = "FILTER_" + country.replace("-","_") + "_" + type + "_" + team + "_" + campaignName.replace("-","_").replace(" ","_")
				return result.toUpperCase();
			}
			else if (feature == "SQL"){
				// get the small element and set the message
				const result = "QR_" + country.replace("-","_") + "_" + type + "_" + team + "_" + campaignName.replace("-","_").replace(" ","_")
				return result.toUpperCase();
			}
			else if (feature == "AUT"){
				// get the small element and set the message
				const result = "AUT_" + country.replace("-","_") + "_" + type + "_" + team + "_" + campaignName.replace("-","_").replace(" ","_")
				return result.toUpperCase();
			}
			else if (feature == "IMPORT"){
				// get the small element and set the message
				const result = "IMPORT_" + country.replace("-","_") + "_" + type + "_" + team + "_" + campaignName.replace("-","_").replace(" ","_")
				return result.toUpperCase();
			}
			else if (feature == "DATA_EXT"){
				// get the small element and set the message
				const result = "DE_" + country.replace("-","_") + "_" + type + "_" + team + "_" + campaignName.replace("-","_").replace(" ","_")
				return result.toUpperCase();
			}
			else if (feature == "FT"){
				// get the small element and set the message
				const result = "FT_" + country.replace("-","_") + "_" + type + "_" + team + "_" + campaignName.replace("-","_").replace(" ","_")
				return result.toUpperCase();
			}
		}
		function copyFeatureName(feature) {
			if (feature == "EMAIL"){
				
				var copyText = document.getElementById("emailNameResult");
			}
			else if (feature == "DE"){

				var copyText = document.getElementById("deNameResult");
			}
			else if (feature == "FILTER"){

				var copyText = document.getElementById("filterNameResult");
			}
			else if (feature == "SQL"){
				
				var copyText = document.getElementById("sqlNameResult");
			}
			else if (feature == "AUT"){
				
				var copyText = document.getElementById("automationNameResult");
			}
			else if (feature == "IMPORT"){
				
				var copyText = document.getElementById("importNameResult");
			}
			else if (feature == "DATA_EXT"){
				
				var copyText = document.getElementById("dataExtractNameResult");
			}
			else if (feature == "FT"){
				
				var copyText = document.getElementById("fileTransferNameResult");
			}
					
			  /* Select the text field */
			  copyText.select();
			  copyText.setSelectionRange(0, 99999); /* For mobile devices */

			  /* Copy the text inside the text field */
			  navigator.clipboard.writeText(copyText.value);
			  
			  /* Alert the copied text */
			  alert("Copied the text: " + copyText.value);
		}
    
		const form = document.querySelector("#signup");
		const COUNTRY_REQUIRED  = "Please enter your name";
		const CAMPAIGN_REQUIRED = "Please enter your campaign name";
		const CAMPAIGN_INVALID  = "Please enter a correct email address format";

		form.addEventListener("submit", function (event) {
			// stop form submission
			event.preventDefault();

			// validate the form
			//let countryValid = hasValue(form.querySelector("#country"), COUNTRY_REQUIRED);
			//let teamValid = hasValue(form.querySelector("#team"), TEAM_REQUIRED);
			let campaignNameValid = hasValue(form.elements["campaign-name"], CAMPAIGN_REQUIRED);
			//let typeValid = hasValue(form.querySelector("#type"), TYPE_REQUIRED);
			//let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
			// if valid, submit the form.
			if (campaignNameValid) {
				let country = form.querySelector("#country").value;
				let team = form.querySelector("#team").value;
				let campaignName = form.elements["campaign-name"].value.trim().replace("_", "-").replace(" ", "-");
				let type = form.querySelector("#type").value;
				//returning the responses
				form.elements["emailNameResult"].value        = showFeatureName("EMAIL", country, type, team, campaignName);
				form.elements["deNameResult"].value           = showFeatureName("DE", country, type, team, campaignName);
				form.elements["filterNameResult"].value       = showFeatureName("FILTER", country, type, team, campaignName);
				form.elements["sqlNameResult"].value          = showFeatureName("SQL", country, type, team, campaignName);
				form.elements["automationNameResult"].value   = showFeatureName("AUT", country, type, team, campaignName);
				form.elements["importNameResult"].value       = showFeatureName("IMPORT", country, type, team, campaignName);
				form.elements["dataExtractNameResult"].value  = showFeatureName("DATA_EXT", country, type, team, campaignName);
				form.elements["fileTransferNameResult"].value = showFeatureName("FT", country, type, team, campaignName);

				//alert(country + '_' + type + '_' + team + '_' + campaignName );
			}
		});
