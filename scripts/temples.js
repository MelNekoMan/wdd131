// Current year in the footer
const currentYearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// The last modified date and time of the document
const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;

// Hamburger menu toggle
const mainNav = document.querySelector("nav");
const hamburgerButton = document.querySelector("#menu");

hamburgerButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    hamburgerButton.classList.toggle("open");
});