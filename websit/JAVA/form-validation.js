document.querySelectorAll("[data-email-form]").forEach((form) => {
	const status = form.querySelector("[data-form-status]");

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const messageLines = [];
		new FormData(form).forEach((value, name) => {
			if (typeof value !== "string" || !value.trim()) return;

			const field = form.elements.namedItem(name);
			const label = field?.labels?.[0]?.textContent.replace("*", "").trim() || name;
			const displayValue = field instanceof HTMLSelectElement
				? field.selectedOptions[0].textContent.trim()
				: value.trim();

			messageLines.push(`${label}: ${displayValue}`);
		});

		const subjectField = form.elements.namedItem("subject");
		const serviceField = form.elements.namedItem("service");
		const serviceName = serviceField instanceof HTMLSelectElement
			? serviceField.selectedOptions[0].textContent.trim()
			: "";
		const emailSubject = subjectField instanceof HTMLInputElement && subjectField.value.trim()
			? subjectField.value.trim()
			: [form.dataset.emailSubject, serviceName].filter(Boolean).join(": ");
		const subject = encodeURIComponent(emailSubject);
		const body = encodeURIComponent(messageLines.join("\n"));
		const recipient = encodeURIComponent(form.dataset.recipient);

		status.textContent = `Your details are validated. Your email app should open a draft to ${form.dataset.recipient}. Review it and press Send. The team will confirm pricing and availability after reviewing your request.`;
		window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
	});
});

const preferredDate = document.querySelector("#preferred-date");

if (preferredDate) {
	const today = new Date();
	const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
		.toISOString()
		.slice(0, 10);
	preferredDate.min = localDate;
}