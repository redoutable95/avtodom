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



// Отзывы

const reviews = document.querySelectorAll(".review");

let index = 0;

setInterval(() => {

reviews[index].classList.remove("active");

index++;

if(index>=reviews.length)
index=0;

reviews[index].classList.add("active");

},3000);