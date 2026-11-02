const galleryButtons = document.querySelectorAll("[data-lightbox-trigger]");
const lightbox = document.querySelector("[data-lightbox]");

if (galleryButtons.length && lightbox) {
	const lightboxImage = lightbox.querySelector("[data-lightbox-image]");
	const lightboxTitle = lightbox.querySelector("[data-lightbox-title]");
	const lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
	const closeButton = lightbox.querySelector("[data-close-lightbox]");

	const closeLightbox = () => {
		lightbox.hidden = true;
		document.body.classList.remove("lightbox-open");
	};

	galleryButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const { image, title, caption } = button.dataset;
			lightboxImage.src = image;
			lightboxImage.alt = title;
			lightboxTitle.textContent = title;
			lightboxCaption.textContent = caption;
			lightbox.hidden = false;
			document.body.classList.add("lightbox-open");
			closeButton.focus();
		});
	});

	closeButton.addEventListener("click", closeLightbox);
	lightbox.addEventListener("click", (event) => {
		if (event.target === lightbox) {
			closeLightbox();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (!lightbox.hidden && event.key === "Escape") {
			closeLightbox();
		}
	});
}
