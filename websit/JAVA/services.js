const services = [
	{
		name: "Leak Detection & Pipe Repairs",
		categories: ["repairs"],
		image: "images/leak-detection-pipe-repair.jpg",
		imageAlt: "Pipe leak detection and repair service",
		description: "Water leaks waste money and can damage your walls, ceilings, and foundation. We use modern leak detection tools to find hidden leaks without breaking unnecessary walls. Our team repairs burst pipes, dripping taps, and leaking joints quickly and cleanly. We work with copper, PVC, and PPR piping to make sure the fix lasts."
	},
	{
		name: "Drain Cleaning & Blockage Removal",
		categories: ["repairs"],
		image: "images/drain-cleaning-blockage-removal.jpg",
		imageAlt: "Professional drain cleaning service",
		description: "Blocked drains and toilets can disrupt your whole day. We provide professional drain cleaning using high-pressure water jetting and drain rods to clear grease, hair, roots, and other blockages. We also inspect drains with cameras to find the root cause and prevent future problems."
	},
	{
		name: "Geyser & Water Heater Installation / Repair",
		categories: ["repairs", "installations"],
		image: "images/geyser-water-heater-installation.jpg",
		imageAlt: "Geyser and water heater installation",
		description: "No hot water? We install, repair, and maintain all types of electric and solar geysers. Our service includes new geyser installation, thermostat replacement, element repairs, and burst geyser replacement. We also install pressure valves and drip trays to meet SABS safety standards."
	},
	{
		name: "Bathroom & Kitchen Plumbing Installations",
		categories: ["installations"],
		image: "images/bathroom-kitchen-plumbing-installation.jpg",
		imageAlt: "Bathroom and kitchen plumbing installation",
		description: "Renovating or building? We handle complete plumbing installations for bathrooms and kitchens. This includes installing basins, toilets, showers, mixers, sinks, dishwashers, and water filtration systems. We do both new installations and upgrades, with neat pipework and no leaks."
	},
	{
		name: "Emergency Plumbing Services",
		categories: ["emergency"],
		image: "images/emergency-plumbing.png",
		imageAlt: "24/7 emergency plumbing services",
		description: "Plumbing emergencies don't wait for business hours. We offer 24/7 emergency services for burst pipes, major leaks, and blocked sewers. Our rapid response team will minimize water damage and get your plumbing back to normal quickly. We're available nights, weekends, and holidays with competitive emergency rates."
	},
	{
		name: "Water Supply & Pressure Management",
		categories: ["installations"],
		image: "images/water-pressure-management.png",
		imageAlt: "Water supply and pressure management systems",
		description: "Low water pressure or unreliable supply? We install pressure-boosting systems, water tanks, and pressure switches to ensure consistent water pressure throughout your property. We also handle water meter installation, supply line upgrades, and pressure reduction valve installations for optimal water flow and safety."
	}
];

const serviceGrid = document.querySelector("[data-services-grid]");
const filterControls = document.querySelector("[data-service-filters]");
const searchInput = document.querySelector("[data-service-search]");
const sortInput = document.querySelector("[data-service-sort]");
const status = document.querySelector("[data-service-filter-status]");

let selectedCategory = "all";
let searchTerm = "";
let sortMode = "name-asc";

const renderServices = () => {
	if (!serviceGrid) return;

	const matchingServices = [...services]
		.filter((service) => {
			const text = `${service.name} ${service.description}`.toLowerCase();
			const matchesCategory = selectedCategory === "all" || service.categories.includes(selectedCategory);
			const matchesSearch = text.includes(searchTerm.toLowerCase());
			return matchesCategory && matchesSearch;
		})
		.sort((a, b) => {
			if (sortMode === "name-desc") {
				return b.name.localeCompare(a.name);
			}
			if (sortMode === "category") {
				return a.categories[0].localeCompare(b.categories[0]) || a.name.localeCompare(b.name);
			}
			return a.name.localeCompare(b.name);
		});

	serviceGrid.innerHTML = matchingServices.map((service) => `
		<article class="service-card" data-service-categories="${service.categories.join(" ")}">
			<img src="${service.image}" alt="${service.imageAlt}" loading="lazy" decoding="async">
			<div class="service-card-content">
				<h3>${service.name}</h3>
				<p>${service.description}</p>
			</div>
		</article>
	`).join("");

	const visibleCount = matchingServices.length;
	const categoryName = selectedCategory === "all" ? "all" : selectedCategory;
	status.textContent = `Showing ${visibleCount} ${categoryName} ${visibleCount === 1 ? "service" : "services"}`;
};

if (filterControls) {
	const filterButtons = filterControls.querySelectorAll("[data-service-filter]");

	filterButtons.forEach((button) => {
		button.addEventListener("click", () => {
			selectedCategory = button.dataset.serviceFilter;
			filterButtons.forEach((filterButton) => {
				filterButton.setAttribute("aria-pressed", String(filterButton === button));
			});
			renderServices();
		});
	});
}

if (searchInput) {
	searchInput.addEventListener("input", (event) => {
		searchTerm = event.target.value.trim();
		renderServices();
	});
}

if (sortInput) {
	sortInput.addEventListener("change", (event) => {
		sortMode = event.target.value;
		renderServices();
	});
}

renderServices();

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
	item.addEventListener("toggle", () => {
		if (item.open) {
			faqItems.forEach((otherItem) => {
				if (otherItem !== item) otherItem.open = false;
			});
		}
	});
});