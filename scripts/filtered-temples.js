// Current year
const currentYearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// Last Modified
const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;

// Hamburger menu toggle
const mainNav = document.querySelector("nav");
const hamburgerButton = document.querySelector("#menu");

hamburgerButton.addEventListener("click", () => {
  mainNav.classList.toggle("open");
  hamburgerButton.classList.toggle("open");
});

// DOM Container
const container = document.querySelector("#temple-cards-container");

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Sapporo Japan",
    location: "Sapporo, Japan",
    dedicated: "2016, August, 21",
    area: 48480,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/sapporo-japan-temple/sapporo-japan-temple-3374.jpg"
  },
  {
    templeName: "Caracas Venezuela",
    location: "Caracas, Venezuela",
    dedicated: "2000, August, 20",
    area: 15332,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/caracas-venezuela-temple/caracas-venezuela-temple-55702.jpg"
  },
  {
    templeName: "Bogotá Colombia",
    location: "Bogotá, Colombia",
    dedicated: "1999, April, 24",
    area: 53500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/bogota-colombia-temple/bogota-colombia-temple-29866.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669.jpg"
  },
  {
    templeName: "Bern Switzerland",
    location: "Zollikofen, Switzerland",
    dedicated: "1955, September, 11",
    area: 35500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/bern-switzerland-temple/bern-switzerland-temple-54641.jpg"
  },
];

// Generating Temple Cards
function createTempleCard(templeList) {
  container.innerHTML = "";

  templeList.forEach((temple) => {
    const card = document.createElement("section");
    card.classList.add("temple-card");

    card.innerHTML = `
      <h2>${temple.templeName}</h2>
      <p><span class="label">Location:</span> ${temple.location}</p>
      <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
      <p><span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft</p>
      <img 
        src="${temple.imageUrl}" 
        alt="${temple.templeName} Temple" 
        loading="lazy" 
        width="400" 
        height="250"
      >
    `;

    container.appendChild(card);
  });
}

const homeLink = document.querySelector("#home");
const oldLink = document.querySelector("#old");
const newLink = document.querySelector("#new");
const largeLink = document.querySelector("#large");
const smallLink = document.querySelector("#small");

function getYear(dedicatedDate) {
  return parseInt(dedicatedDate.split(",")[0]);
}

homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  createTempleCard(temples);
});

oldLink.addEventListener("click", (e) => {
  e.preventDefault();
  const oldTemples = temples.filter((temple) => getYear(temple.dedicated) < 1900);
  createTempleCard(oldTemples);
});

newLink.addEventListener("click", (e) => {
  e.preventDefault();
  const newTemples = temples.filter((temple) => getYear(temple.dedicated) > 2000);
  createTempleCard(newTemples);
});

largeLink.addEventListener("click", (e) => {
  e.preventDefault();
  const largeTemples = temples.filter((temple) => temple.area > 90000);
  createTempleCard(largeTemples);
});

smallLink.addEventListener("click", (e) => {
  e.preventDefault();
  const smallTemples = temples.filter((temple) => temple.area < 10000);
  createTempleCard(smallTemples);
});

createTempleCard(temples);