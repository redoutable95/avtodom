const REVIEWS_PER_PAGE = 6;
let visibleReviews = REVIEWS_PER_PAGE;
/**
 * Запуск компонента отзывов
 */
document.addEventListener("DOMContentLoaded", () => {
    initReviews();
    const modal = document.getElementById("reviewModal");

const closeButton = document.getElementById("closeReviewModal");

if (modal && closeButton) {

    // Закрытие по кнопке ×
    closeButton.addEventListener("click", closeReviewModal);

    // Закрытие по клику на затемнение
    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            closeReviewModal();

        }

    });

    // Закрытие по Esc
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeReviewModal();

        }

    });

}
});

/**
 * Главная функция компонента
 */
async function initReviews() {

    try {

        const data = await loadReviews();
        renderHeader(data.organization);
        renderReviews(data.reviews);
        setupLoadMoreButton(data.reviews);
        console.log("Отзывы успешно загружены:");

        console.log(data);

    } catch (error) {

        console.error("Ошибка загрузки отзывов:", error);

    }

}

/**
 * Загружает reviews.json
 */
async function loadReviews() {

    const response = await fetch("assets/data/reviews.json")

    if (!response.ok) {

        throw new Error("Не удалось загрузить reviews.json");

    }

    return await response.json();

}
/**
 * Заполняет верхнюю панель отзывов
 */
function renderHeader(organization) {

    const ratingElement = document.getElementById("reviewsRating");
    const countElement = document.getElementById("reviewsCount");
    const buttonElement = document.getElementById("reviewsButton");

    ratingElement.textContent = organization.rating.replace(",", ".");

    countElement.textContent =
        `На основании ${organization.reviews_count} отзывов`;

    buttonElement.href = organization.url;

}
/**
 * Создает карточки отзывов
 */
function renderReviews(reviews) {

    const grid = document.getElementById("reviewsGrid");

    grid.innerHTML = "";

    reviews
    .slice(0, visibleReviews)
    .forEach(review => {

        reviewsGrid.appendChild(
            createReviewCard(review)
        );

    });

}
/**
 * Добавляет отзывы в конец списка
 */
function appendReviews(reviews, startIndex, endIndex) {

    const reviewsGrid = document.getElementById("reviewsGrid");

    reviews
        .slice(startIndex, endIndex)
        .forEach(review => {

            reviewsGrid.appendChild(
                createReviewCard(review)
            );

        });

}
/**
 * Создает одну карточку отзыва
 */
function createReviewCard(review) {

    const card = document.createElement("article");

    card.className = "review-card";

    card.innerHTML = `
        <div class="review-card__stars">
    ${createStars(review.rating)}
</div>

        <div class="review-card__top">

            <h3 class="review-card__author">
                ${review.author}
            </h3>

            <span class="review-card__date">
                ${formatDate(review.date)}
            </span>

        </div>

        <p class="review-card__text">
            ${truncateText(review.text)}
        </p>

        ${review.text.length > 220 ? `
    <button class="review-card__more">
    Читать полностью →
</button>
` : ""}
    `;
const button = card.querySelector(".review-card__more");

if (button) {

    button.addEventListener("click", () => {

        openReviewModal(review);

    });

}
    return card;

}
/**
 * Форматирует дату для отображения
 */
function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("ru-RU", {

        day: "numeric",
        month: "long",
        year: "numeric"

    });

}
/**
 * Обрезает длинный текст отзыва
 */
function truncateText(text, maxLength = 220) {

    if (text.length <= maxLength) {
        return text;
    }

    return text.slice(0, maxLength).trim() + "...";

}

/**
 * Создает SVG-звезды по рейтингу
 */
function createStars(rating) {

    const maxStars = 5;
    const filledStars = Math.round(Number(rating));

    let stars = "";

    for (let i = 1; i <= maxStars; i++) {

        stars += `
            <svg
                class="review-card__star ${i <= filledStars ? "is-filled" : ""}"
                viewBox="0 0 24 24"
                aria-hidden="true">

                <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52 6.12 20.61l1.12-6.55L2.48 9.42l6.58-.96L12 2.5z"/>

            </svg>
        `;

    }

    return stars;

}
/**
 * Подключает кнопку "Показать ещё"
 */
function setupLoadMoreButton(reviews) {

    const button = document.getElementById("loadMoreReviews");

    if (!button) {
        return;
    }

    if (reviews.length <= REVIEWS_PER_PAGE) {

        button.classList.add("hidden");

        return;

    }

    button.addEventListener("click", () => {

        const startIndex = visibleReviews;

        visibleReviews += REVIEWS_PER_PAGE;

        appendReviews(
            reviews,
            startIndex,
            visibleReviews
        );

        if (visibleReviews >= reviews.length) {

            button.classList.add("hidden");

        }

    });

}
/**
 * Открывает модальное окно с полным текстом отзыва
 */
function openReviewModal(review) {

    const modal = document.getElementById("reviewModal");

    document.getElementById("modalReviewAuthor").textContent =
        review.author;

    document.getElementById("modalReviewRating").innerHTML =
        createStars(review.rating);

    document.getElementById("modalReviewDate").textContent =
        formatDate(review.date);

    document.getElementById("modalReviewText").textContent =
        review.text;

    modal.classList.add("active");

}
/**
 * Закрывает модальное окно
 */
function closeReviewModal() {

    const modal = document.getElementById("reviewModal");

    modal.classList.remove("active");

}