document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".faq-item button").forEach(btn => {
        btn.onclick = () => {
            const answer = btn.nextElementSibling;
            answer.style.display = answer.style.display === "block" ? "none" : "block";
        };
    });

    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const reviews = document.querySelectorAll(".review");

    if (reviews.length) {
        let index = 0;

        setInterval(() => {
            reviews[index].classList.remove("active");
            index++;

            if (index >= reviews.length) {
                index = 0;
            }

            reviews[index].classList.add("active");
        }, 3000);
    }

    initGallerySlider();
});

function initGallerySlider() {
    const slider = document.querySelector(".gallery-slider");

    if (!slider) return;

    const viewport = slider.querySelector(".gallery-viewport");
    const slides = Array.from(slider.querySelectorAll(".gallery-slide"));
    const previous = slider.querySelector(".gallery-button--prev");
    const next = slider.querySelector(".gallery-button--next");
    const current = slider.querySelector(".gallery-current");
    const total = slider.querySelector(".gallery-total");

    if (!viewport || !slides.length || !previous || !next) return;

    slides.forEach(slide => {
        const image = slide.querySelector("img");

        if (image) {
            slide.style.setProperty("--gallery-image", `url("${image.currentSrc || image.src}")`);
        }
    });

    total.textContent = slides.length;

    const getCurrentIndex = () => {
        let nearestIndex = 0;
        let nearestDistance = Infinity;

        slides.forEach((slide, index) => {
            const distance = Math.abs(slide.offsetLeft - viewport.scrollLeft);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
            }
        });

        return nearestIndex;
    };

    const updateControls = () => {
        const index = getCurrentIndex();
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;

        current.textContent = index + 1;
        previous.disabled = viewport.scrollLeft <= 1;
        next.disabled = viewport.scrollLeft >= maxScroll - 1;
    };

    const goTo = index => {
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        const targetScroll = Math.min(slides[index].offsetLeft, maxScroll);

        viewport.scrollTo({ left: targetScroll, behavior: "smooth" });
    };

    previous.addEventListener("click", () => goTo(Math.max(getCurrentIndex() - 1, 0)));
    next.addEventListener("click", () => goTo(Math.min(getCurrentIndex() + 1, slides.length - 1)));

    viewport.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            previous.click();
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            next.click();
        }
    });

    viewport.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    updateControls();
}
