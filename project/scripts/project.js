function getFavorites() {
  const favorites = localStorage.getItem('obd2_favorites');
  return favorites ? JSON.parse(favorites) : [];
}

function toggleFavorite(codeId) {
  let favorites = getFavorites();
  
  if (favorites.includes(codeId)) {
    favorites = favorites.filter(id => id !== codeId);
  } else {
    favorites.push(codeId);
  }
  
  localStorage.setItem('obd2_favorites', JSON.stringify(favorites));
  renderCards();
}

const diagnosticData = [
  {
    id: "p0300",
    category: "code",
    title: "P0300 - Random/Multiple Cylinder Misfire",
    icon: "images/engine.png",
    symptoms: ["Rough idle and hesitating acceleration", "Flashing Check Engine Light", "Engine shaking"],
    causes: ["Worn spark plugs or ignition coils", "Low fuel pressure", "Vacuum leaks"],
    severity: "High (Avoid driving with a flashing light)",
    details: "A P0300 code indicates that the engine computer (PCM) detected misfires occurring randomly across multiple cylinders, preventing complete combustion."
  },
  {
    id: "ckp-sensor",
    category: "sensor",
    title: "Sensor: Crankshaft Position (CKP)",
    icon: "images/sensor.png",
    symptoms: ["Engine cranks but will not start", "Intermittent stalling when hot", "Engine RPM tachometer drops to zero"],
    causes: ["Faulty CKP sensor internal winding", "Damaged harness connector or wiring", "Missing reluctor wheel teeth"],
    severity: "High (Vehicle may shut off while driving)",
    details: "The CKP sensor measures the rotational speed and precise angular position of the crankshaft so the PCM can synchronize spark timing and fuel injection."
  },
  {
    id: "p0102",
    category: "code",
    title: "P0102 - MAF Circuit Low Input",
    icon: "images/maf-sensor.png",
    symptoms: ["Poor acceleration and engine hesitation", "Excessive fuel consumption", "Black exhaust smoke"],
    causes: ["Dirty or contaminated MAF sensor wire", "Dislodged intake boot or vacuum leak", "Faulty MAF sensor unit"],
    severity: "Medium",
    details: "This DTC triggers when the Mass Air Flow sensor reports air volume signal voltage lower than the manufacturer's expected operating threshold."
  },
  {
    id: "o2-sensor",
    category: "sensor",
    title: "Sensor: Oxygen Sensor (O2 / HO2S)",
    icon: "images/oxygen-sensor.png",
    symptoms: ["Decreased fuel economy (MPG drop)", "Failed emissions testing", "Rough running idle"],
    causes: ["Silicone or oil contamination on tip", "Exhaust leaks upstream of sensor", "Aged element heating failure"],
    severity: "Low to Medium",
    details: "The O2 sensor monitors unburned oxygen percentages in exhaust gases, enabling the PCM to continuously adjust air-fuel ratios (closed-loop operation)."
  },
  {
    id: "p0171",
    category: "code",
    title: "P0171 - System Too Lean (Bank 1)",
    icon: "images/lean.png",
    symptoms: ["Engine knocking or pinging under load", "Hard starting conditions", "Lack of engine power"],
    causes: ["Vacuum hose leaks or intake manifold gasket leak", "Clogged fuel injectors", "Weak fuel pump"],
    severity: "Medium to High",
    details: "P0171 signifies that the air-fuel mixture contains too much air or insufficient fuel, causing the PCM to reach maximum positive fuel trim correction limits."
  },
  {
    id: "tps-sensor",
    category: "sensor",
    title: "Sensor: Throttle Position Sensor (TPS)",
    icon: "images/tps.png",
    symptoms: ["Uncontrolled idle speed spikes", "Surging acceleration without pressing pedal", "Automatic transmission shifting issues"],
    causes: ["Worn internal wiper tracks", "Short circuit in signal wire", "Loose throttle body mounting"],
    severity: "Medium",
    details: "The TPS tracks the opening angle of the throttle plate, informing the PCM how much driver throttle response is requested."
  }
];

const cardsGrid = document.getElementById('cards-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('details-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');


let currentCategory = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  setupEventListeners();
  updateFooterInfo();
});

function renderCards() {
  cardsGrid.innerHTML = '';

  const filteredData = diagnosticData.filter(item => {
    const matchesCategory = (currentCategory === 'all') || (item.category === currentCategory);
    const searchString = `${item.title} ${item.symptoms.join(' ')} ${item.details}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (filteredData.length === 0) {
    cardsGrid.innerHTML = `<p class="no-results">No diagnostic records matched your filter or search query.</p>`;
    return;
  }

  filteredData.forEach(item => {
    const card = document.createElement('article');
    card.classList.add('info-card');

    card.innerHTML = `
      <div class="card-header">
        <h3>${item.title}</h3>
        <img src="${item.icon}" alt="${item.title} icon" class="card-icon" width="32" height="32">
      </div>
      <div class="card-body">
        <p class="section-label">Key Symptoms</p>
        <ul>
          ${item.symptoms.slice(0, 2).map(symptom => `<li>${symptom}</li>`).join('')}
        </ul>
      </div>
      <button class="card-link-btn" data-id="${item.id}">Read Details &rsaquo;</button>
    `;

    cardsGrid.appendChild(card);
  });
}

function setupEventListeners() {
  // Search Input Listener
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderCards();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderCards();
    });
  });

  cardsGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-link-btn')) {
      const itemId = e.target.dataset.id;
      openModal(itemId);
    }
  });

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function openModal(id) {
  const item = diagnosticData.find(entry => entry.id === id);
  if (!item) return;

  modalBody.innerHTML = `
    <h2>${item.title}</h2>
    <p class="modal-severity"><strong>Diagnostic Severity:</strong> ${item.severity}</p>
    <p class="modal-description">${item.details}</p>

    <h3>Common Symptoms:</h3>
    <ul>
      ${item.symptoms.map(s => `<li>${s}</li>`).join('')}
    </ul>

    <h3>Possible Root Causes:</h3>
    <ul>
      ${item.causes.map(c => `<li>${c}</li>`).join('')}
    </ul>
  `;

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('modal-open');
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('modal-open');
}

function updateFooterInfo() {
  const currentYearSpan = document.getElementById('current-year');
  const lastModifiedP = document.getElementById('last-modified');

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  if (lastModifiedP) {
    lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
  }
}