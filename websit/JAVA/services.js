const filterControls = document.querySelector("[data-service-filters]");

if (filterControls) {
	const filterButtons = filterControls.querySelectorAll("[data-service-filter]");
	const serviceCards = document.querySelectorAll("[data-service-categories]");
	const status = document.querySelector("[data-service-filter-status]");

	filterButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const selectedCategory = button.dataset.serviceFilter;
			let visibleCount = 0;

			filterButtons.forEach((filterButton) => {
				filterButton.setAttribute("aria-pressed", String(filterButton === button));
			});

			serviceCards.forEach((card) => {
				const categories = card.dataset.serviceCategories.split(" ");
				const isVisible = selectedCategory === "all" || categories.includes(selectedCategory);

				card.hidden = !isVisible;
				if (isVisible) visibleCount += 1;
			});

			const categoryName = selectedCategory === "all" ? "all" : button.textContent.trim().toLowerCase();
			status.textContent = `Showing ${visibleCount} ${categoryName} ${visibleCount === 1 ? "service" : "services"}`;
		});
	});
}