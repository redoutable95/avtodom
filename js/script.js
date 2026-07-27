// FAQ

document.querySelectorAll(".faq-item button").forEach(btn => {

btn.onclick = () => {

const answer = btn.nextElementSibling;

answer.style.display =
answer.style.display === "block"
? "none"
: "block";

};

});



// Бургер-меню
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

// Отзывы
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