// =======================================
// Автошкола
// organization.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    fadeAnimation();

    activeMenu();

    documentButtons();

    initMobileMenu();

    makeEduTablesResponsive();

});


// =======================================
// Плавое появление блоков
// =======================================

function fadeAnimation(){

    const elements = document.querySelectorAll(
        ".card, .document, .table-row, .sidebar li"
    );

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{
        threshold:.15
    });

    elements.forEach(el=>{

        el.classList.add("fade");

        observer.observe(el);

    });

}



// =======================================
// Подсветка активного пункта меню
// =======================================

function activeMenu(){

    const current =
        window.location.pathname.split("/").pop();

    document.querySelectorAll(".sidebar a")
        .forEach(link=>{

            const href =
                link.getAttribute("href");

            if(href===current){

                link.parentElement.classList.add("active");

            }

        });

}



// =======================================
// Скачать документ
// =======================================

function documentButtons(){

    const buttons =
        document.querySelectorAll(".download");

    buttons.forEach(btn=>{

        btn.addEventListener("click",()=>{

            alert("Позже здесь будет скачивание PDF.");

        });

    });

}



// =======================================
// Будущий поиск документов
// =======================================

function searchDocuments(text){

    console.log(text);

}



// =======================================
// Проверка подписи PDF
// =======================================

function checkSignature(file){

    /*
        Здесь позже будет

        if(pdf подписан){

            добавить зеленую галочку

        }

    */

}



// =======================================
// Мобильное меню
// =======================================

function initMobileMenu(){

    const navToggle = document.querySelector(".nav-toggle");

    const mainNav = document.querySelector(".main-nav");

    if(!navToggle || !mainNav) return;

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

function toggleMenu(){

    document
        .querySelector("nav")
        .classList.toggle("open");

}



// =======================================
// Scroll наверх
// =======================================

window.addEventListener("scroll",()=>{

    const btn =
        document.querySelector(".scroll-top");

    if(!btn) return;

    if(window.scrollY>500){

        btn.classList.add("show");

    }

    else{

        btn.classList.remove("show");

    }

});


// =======================================
// Адаптация учебных таблиц для мобильных экранов
// =======================================

function makeEduTablesResponsive(){

    document.querySelectorAll(".edu-table").forEach(table => {

        const headers = Array.from(table.querySelectorAll("thead th"))
            .map(header => header.textContent.trim());

        table.querySelectorAll("tbody tr").forEach(row => {

            Array.from(row.cells).forEach((cell, index) => {

                if(headers[index]){

                    cell.dataset.label = headers[index];

                }

            });

        });

    });

}
