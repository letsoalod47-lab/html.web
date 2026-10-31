const serviceSelect = document.querySelector("#service");
const followUpPanel = document.querySelector("#service-follow-up");

if (serviceSelect && followUpPanel) {
	const followUpQuestions = followUpPanel.querySelectorAll("[data-follow-up-for]");
	const followUpHint = followUpPanel.querySelector("[data-follow-up-hint]");

	const hints = {
		"leak-repair": "Let us know if the leak is still active.",
		"drain-cleaning": "Tell us which drain or fixture is affected.",
		geyser: "Choose the geyser problem you need help with.",
		installation: "Tell us which room or installation is involved.",
		emergency: "This helps us understand the urgency of the problem.",
		"water-pressure": "Choose the water supply problem you are experiencing.",
		other: "Briefly name the service you are looking for."
	};

	const updateFollowUp = () => {
		const selectedService = serviceSelect.value;
		followUpPanel.hidden = !selectedService;
		followUpHint.textContent = hints[selectedService] || "";

		followUpQuestions.forEach((question) => {
			const isActive = question.dataset.followUpFor === selectedService;
			question.hidden = !isActive;
			question.querySelectorAll("input, select, textarea").forEach((field) => {
				field.disabled = !isActive;
			});
		});
	};

	serviceSelect.addEventListener("change", updateFollowUp);
	updateFollowUp();
}