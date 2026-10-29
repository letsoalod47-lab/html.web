document.querySelectorAll(".site-nav").forEach((nav) => {
	const toggle = nav.querySelector(".menu-toggle");

	toggle.addEventListener("click", () => {
		const isOpen = nav.classList.toggle("is-open");
		toggle.setAttribute("aria-expanded", String(isOpen));
	});

	nav.querySelectorAll(".main-nav a").forEach((link) => {
		link.addEventListener("click", () => {
			nav.classList.remove("is-open");
			toggle.setAttribute("aria-expanded", "false");
		});
	});

	nav.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && nav.classList.contains("is-open")) {
			nav.classList.remove("is-open");
			toggle.setAttribute("aria-expanded", "false");
			toggle.focus();
		}
	});
});
