const WORLD_GEOJSON_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const G20_COUNTRY_NAMES = new Set([
    "Argentina",
    "Australia",
    "Brazil",
    "Canada",
    "China",
    "France",
    "Germany",
    "India",
    "Indonesia",
    "Italy",
    "Japan",
    "Mexico",
    "Russia",
    "Saudi Arabia",
    "South Africa",
    "Turkey",
    "Türkiye",
    "United Kingdom",
    "United States",
    "United States of America",
    "South Korea",
    "Republic of Korea",
    "Korea, Republic of"
]);

const COUNTRY_ALIASES = {
    "United States of America": "United States",
    "United States": "United States",
    "Republic of Korea": "South Korea",
    "Korea, Republic of": "South Korea",
    "Türkiye": "Turkey",
    "Russian Federation": "Russia"
};

const COUNTRY_INFO = {
    "Argentina": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Australia": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Brazil": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Canada": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "China": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "France": {
        strategy: "—",
        regulation: "EU AI Act",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Germany": {
        strategy: "—",
        regulation: "EU AI Act",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "India": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Indonesia": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Italy": {
        strategy: "—",
        regulation: "EU AI Act",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Japan": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Mexico": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Russia": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Saudi Arabia": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "South Africa": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "South Korea": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "Turkey": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "United Kingdom": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    },
    "United States": {
        strategy: "—",
        regulation: "—",
        text: "Карточка страны: стратегия ИИ, регулирование, институты и ключевые документы."
    }
};

const G20_POINTS = [
    { name: "Argentina", lat: -34.60, lng: -58.38 },
    { name: "Australia", lat: -35.28, lng: 149.13 },
    { name: "Brazil", lat: -15.79, lng: -47.88 },
    { name: "Canada", lat: 45.42, lng: -75.69 },
    { name: "China", lat: 39.90, lng: 116.40 },
    { name: "France", lat: 48.85, lng: 2.35 },
    { name: "Germany", lat: 52.52, lng: 13.40 },
    { name: "India", lat: 28.61, lng: 77.21 },
    { name: "Indonesia", lat: -6.21, lng: 106.85 },
    { name: "Italy", lat: 41.90, lng: 12.50 },
    { name: "Japan", lat: 35.68, lng: 139.76 },
    { name: "Mexico", lat: 19.43, lng: -99.13 },
    { name: "Russia", lat: 55.75, lng: 37.62 },
    { name: "Saudi Arabia", lat: 24.71, lng: 46.67 },
    { name: "South Africa", lat: -25.75, lng: 28.23 },
    { name: "South Korea", lat: 37.57, lng: 126.98 },
    { name: "Turkey", lat: 39.93, lng: 32.86 },
    { name: "United Kingdom", lat: 51.51, lng: -0.13 },
    { name: "United States", lat: 38.90, lng: -77.04 }
];

const globeNode = document.getElementById("globe");
const loadingNode = document.getElementById("loading");
const cardNode = document.getElementById("country-card");

function normalizeCountryName(name) {
    return COUNTRY_ALIASES[name] || name;
}

function isG20Country(feature) {
    const name = normalizeCountryName(feature?.properties?.name || "");
    return G20_COUNTRY_NAMES.has(name);
}

function updateCard(countryName) {
    const name = normalizeCountryName(countryName);
    const info = COUNTRY_INFO[name];

    if (!info) {
        cardNode.innerHTML = `
            <p class="card-kicker">страна</p>
            <h3>${name}</h3>
            <p>Для этой страны карточка пока не заполнена.</p>
            <div class="metric-grid">
                <div><span>Стратегия ИИ</span><strong>—</strong></div>
                <div><span>Регулирование</span><strong>—</strong></div>
            </div>
        `;
        return;
    }

    cardNode.innerHTML = `
        <p class="card-kicker">страна G20</p>
        <h3>${name}</h3>
        <p>${info.text}</p>
        <div class="metric-grid">
            <div><span>Стратегия ИИ</span><strong>${info.strategy}</strong></div>
            <div><span>Регулирование</span><strong>${info.regulation}</strong></div>
        </div>
    `;
}

function getGlobeSize() {
    const rect = globeNode.getBoundingClientRect();
    return {
        width: Math.max(320, Math.floor(rect.width)),
        height: Math.max(420, Math.floor(rect.height))
    };
}

const size = getGlobeSize();

const world = Globe()(globeNode)
    .width(size.width)
    .height(size.height)
    .backgroundColor("rgba(0,0,0,0)")
    .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-dark.jpg")
    .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
    .showAtmosphere(true)
    .atmosphereColor("#89dfe0")
    .atmosphereAltitude(0.2)
    .polygonAltitude(feature => isG20Country(feature) ? 0.05 : 0.01)
    .polygonCapColor(feature => isG20Country(feature) ? "rgba(212, 225, 225, 0.92)" : "rgba(255, 255, 255, 0.04)")
    .polygonSideColor(feature => isG20Country(feature) ? "rgba(137, 223, 224, 0.28)" : "rgba(255, 255, 255, 0.02)")
    .polygonStrokeColor(feature => isG20Country(feature) ? "rgba(255, 255, 255, 0.82)" : "rgba(255, 255, 255, 0.1)")
    .polygonLabel(feature => {
        const name = normalizeCountryName(feature?.properties?.name || "");
        return `<div class="tooltip"><b>${name}</b>${G20_COUNTRY_NAMES.has(name) ? "<br/>страна G20" : ""}</div>`;
    })
    .onPolygonClick(feature => {
        const name = normalizeCountryName(feature?.properties?.name || "");
        updateCard(name);
    })
    .pointsData(G20_POINTS)
    .pointLat(d => d.lat)
    .pointLng(d => d.lng)
    .pointAltitude(0.08)
    .pointRadius(0.28)
    .pointColor(() => "#89dfe0")
    .pointLabel(d => `<div class="tooltip"><b>${d.name}</b><br/>карточка страны</div>`)
    .onPointClick(d => updateCard(d.name));

world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.28;
world.controls().enableDamping = true;
world.controls().dampingFactor = 0.06;
world.pointOfView({ lat: 20, lng: 18, altitude: 2.05 }, 0);

fetch(WORLD_GEOJSON_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error("GeoJSON не загрузился");
        }
        return response.json();
    })
    .then(data => {
        world.polygonsData(data.features);
        loadingNode.style.display = "none";
    })
    .catch(error => {
        console.error(error);
        loadingNode.textContent = "Не удалось загрузить контуры стран. Проверьте интернет-соединение.";
    });

window.addEventListener("resize", () => {
    const nextSize = getGlobeSize();
    world.width(nextSize.width).height(nextSize.height);
});
