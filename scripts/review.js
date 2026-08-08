const currentYearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;

document.addEventListener("DOMContentLoaded", () => {
    const reviewDisplay = document.getElementById("review-count");

    let reviewCount = Number(window.localStorage.getItem("reviewCounter-ls")) || 0;

    reviewCount++;

    window.localStorage.setItem("reviewCounter-ls", reviewCount);

    if (reviewDisplay) {
        reviewDisplay.textContent = reviewCount;
    }
});