const countryMetaByGeoName = {
    "Argentina": {
        ru: "Аргентина",
        slug: "argentina",
        lat: -38.4,
        lng: -63.6
    },
    "Australia": {
        ru: "Австралия",
        slug: "australia",
        lat: -25.3,
        lng: 133.8
    },
    "Brazil": {
        ru: "Бразилия",
        slug: "brazil",
        lat: -14.2,
        lng: -51.9
    },
    "Canada": {
        ru: "Канада",
        slug: "canada",
        lat: 56.1,
        lng: -106.3
    },
    "China": {
        ru: "Китай",
        slug: "china",
        lat: 35.8,
        lng: 104.1
    },
    "France": {
        ru: "Франция",
        slug: "france",
        lat: 46.2,
        lng: 2.2
    },
    "Germany": {
        ru: "Германия",
        slug: "germany",
        lat: 51.2,
        lng: 10.4
    },
    "India": {
        ru: "Индия",
        slug: "india",
        lat: 22.6,
        lng: 79.0
    },
    "Indonesia": {
        ru: "Индонезия",
        slug: "indonesia",
        lat: -2.5,
        lng: 118.0
    },
    "Italy": {
        ru: "Италия",
        slug: "italy",
        lat: 41.9,
        lng: 12.6
    },
    "Japan": {
        ru: "Япония",
        slug: "japan",
        lat: 36.2,
        lng: 138.2
    },
    "Mexico": {
        ru: "Мексика",
        slug: "mexico",
        lat: 23.6,
        lng: -102.5
    },
    "Russia": {
        ru: "Россия",
        slug: "russia",
        lat: 61.5,
        lng: 105.3
    },
    "Russian Federation": {
        ru: "Россия",
        slug: "russia",
        lat: 61.5,
        lng: 105.3
    },
    "Saudi Arabia": {
        ru: "Саудовская Аравия",
        slug: "saudi-arabia",
        lat: 23.9,
        lng: 45.1
    },
    "South Africa": {
        ru: "ЮАР",
        slug: "south-africa",
        lat: -30.6,
        lng: 22.9
    },
    "South Korea": {
        ru: "Южная Корея",
        slug: "south-korea",
        lat: 36.5,
        lng: 127.9
    },
    "Republic of Korea": {
        ru: "Южная Корея",
        slug: "south-korea",
        lat: 36.5,
        lng: 127.9
    },
    "Korea, Republic of": {
        ru: "Южная Корея",
        slug: "south-korea",
        lat: 36.5,
        lng: 127.9
    },
    "Turkey": {
        ru: "Турция",
        slug: "turkey",
        lat: 39.0,
        lng: 35.2
    },
    "Türkiye": {
        ru: "Турция",
        slug: "turkey",
        lat: 39.0,
        lng: 35.2
    },
    "United Kingdom": {
        ru: "Великобритания",
        slug: "united-kingdom",
        lat: 55.4,
        lng: -3.4
    },
    "United Kingdom of Great Britain and Northern Ireland": {
        ru: "Великобритания",
        slug: "united-kingdom",
        lat: 55.4,
        lng: -3.4
    },
    "United States": {
        ru: "США",
        slug: "usa",
        lat: 39.8,
        lng: -98.6
    },
    "United States of America": {
        ru: "США",
        slug: "usa",
        lat: 39.8,
        lng: -98.6
    },
    "USA": {
        ru: "США",
        slug: "usa",
        lat: 39.8,
        lng: -98.6
    }
};

/*
    Дополнительный белый слой.
    Координаты примерные, не точные административные границы.
    Для финальной версии лучше заменить на точный GeoJSON.
*/
const extraWhiteAreas = [
    {
        type: "Feature",
        properties: {
            name: "Крым",
            forceWhite: true,
            slug: "russia"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [32.4, 45.4],
                [33.2, 46.2],
                [35.6, 45.9],
                [36.6, 45.3],
                [36.3, 44.6],
                [34.1, 44.4],
                [32.4, 44.9],
                [32.4, 45.4]
            ]]
        }
    },
    {
        type: "Feature",
        properties: {
            name: "ДНР",
            forceWhite: true,
            slug: "russia"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [36.8, 48.9],
                [39.2, 49.3],
                [39.1, 47.8],
                [38.0, 47.0],
                [36.7, 47.5],
                [36.8, 48.9]
            ]]
        }
    },
    {
        type: "Feature",
        properties: {
            name: "ЛНР",
            forceWhite: true,
            slug: "russia"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [38.5, 50.1],
                [40.2, 50.4],
                [40.3, 48.6],
                [39.0, 48.0],
                [38.2, 49.0],
                [38.5, 50.1]
            ]]
        }
    },
    {
        type: "Feature",
        properties: {
            name: "Запорожская область",
            forceWhite: true,
            slug: "russia"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [34.0, 48.4],
                [37.2, 48.1],
                [37.1, 46.6],
                [35.0, 46.0],
                [33.8, 46.8],
                [34.0, 48.4]
            ]]
        }
    },
    {
        type: "Feature",
        properties: {
            name: "Херсонская область",
            forceWhite: true,
            slug: "russia"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [31.0, 47.3],
                [35.0, 47.3],
                [35.0, 45.8],
                [32.3, 45.4],
                [31.0, 46.0],
                [31.0, 47.3]
            ]]
        }
    }
];

const g20Labels = Object.values(countryMetaByGeoName).filter((country, index, array) => {
    return array.findIndex(item => item.slug === country.slug) === index;
});

function getCountryMeta(feature) {
    const geoName = feature?.properties?.name;
    return countryMetaByGeoName[geoName] || null;
}

function isG20Country(feature) {
    return getCountryMeta(feature) !== null;
}

function isForceWhiteArea(feature) {
    return feature?.properties?.forceWhite === true;
}

function isWhiteArea(feature) {
    return isG20Country(feature) || isForceWhiteArea(feature);
}

function openCountryPage(meta) {
    window.open(`/country/${meta.slug}`, "_blank", "noopener,noreferrer");
}

function createCountryLabel(country) {
    const element = document.createElement("div");

    element.className = "map-country-label";
    element.textContent = country.ru;
    element.title = country.ru;

    element.addEventListener("click", event => {
        event.stopPropagation();
        openCountryPage(country);
    });

    return element;
}

fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .then(response => response.json())
    .then(worldData => {
        const allPolygons = worldData.features.concat(extraWhiteAreas);

        const globe = Globe()(document.getElementById("globeViz"))
            .backgroundColor("#000000")
            .width(window.innerWidth)
            .height(window.innerHeight)

            .showAtmosphere(true)
            .atmosphereColor("#ffffff")
            .atmosphereAltitude(0.12)

            .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
            .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")

            .polygonsData(allPolygons)

            .polygonCapColor(feature => {
                return isWhiteArea(feature)
                    ? "rgba(255,255,255,0.98)"
                    : "rgba(255,255,255,0.08)";
            })

            .polygonSideColor(feature => {
                return isWhiteArea(feature)
                    ? "rgba(255,255,255,0.75)"
                    : "rgba(255,255,255,0.03)";
            })

            .polygonStrokeColor(feature => {
                return isWhiteArea(feature)
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.16)";
            })

            .polygonAltitude(feature => {
                if (isForceWhiteArea(feature)) {
                    return 0.04;
                }

                if (isG20Country(feature)) {
                    return 0.025;
                }

                return 0.004;
            })

            .polygonLabel(feature => {
                if (isForceWhiteArea(feature)) {
                    return `
                        <div class="country-tooltip">
                            ${feature.properties.name}
                        </div>
                    `;
                }

                const meta = getCountryMeta(feature);

                if (!meta) {
                    return "";
                }

                return `
                    <div class="country-tooltip">
                        ${meta.ru}
                    </div>
                `;
            })

            .onPolygonHover(feature => {
                const canvas = document.querySelector("#globeViz canvas");

                if (!canvas) return;

                canvas.style.cursor = isWhiteArea(feature) ? "pointer" : "grab";
            })

            .onPolygonClick(feature => {
                if (isForceWhiteArea(feature)) {
                    window.open("/country/russia", "_blank", "noopener,noreferrer");
                    return;
                }

                const meta = getCountryMeta(feature);

                if (!meta) return;

                openCountryPage(meta);
            })

            .polygonsTransitionDuration(300)

            .htmlElementsData(g20Labels)
            .htmlLat(d => d.lat)
            .htmlLng(d => d.lng)
            .htmlAltitude(() => 0.04)
            .htmlElement(d => createCountryLabel(d))

            .pointOfView({
                lat: 20,
                lng: 20,
                altitude: 2.1
            }, 1500);

        const controls = globe.controls();

        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.45;
        controls.enablePan = false;
        controls.minDistance = 160;
        controls.maxDistance = 400;

        window.addEventListener("resize", () => {
            globe.width(window.innerWidth);
            globe.height(window.innerHeight);
        });
    })
    .catch(error => {
        console.error("Ошибка загрузки GeoJSON:", error);
    });