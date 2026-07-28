// Current year in the footer
const currentYearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// The last modified date and time of the document
const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;

// One-line Wind Chill calculation function for Metric units (°C, km/h)
const calculateWindChill = (temp, speed) => 
  (13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16))).toFixed(1);

// Getting HTML elements
const tempElement = document.getElementById("temp");
const windElement = document.getElementById("wind");
const chillElement = document.getElementById("chill");

// Static values from HTML
const temp = parseFloat(tempElement.textContent);
const speed = parseFloat(windElement.textContent);

// Checking conditions: temp <= 10 °C AND wind > 4.8 km/h
if (temp <= 10 && speed > 4.8) {
  chillElement.textContent = `${calculateWindChill(temp, speed)} °C`;
} else {
  chillElement.textContent = "N/A";
}