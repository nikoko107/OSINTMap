// Configuration globale
let config = {};
let map = null;
let complementCount = 0;
let currentResults = [];
let markersLayer = null;
let drawingMode = false;
let boundingBox = null;
let bboxRectangle = null;

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Charger la configuration
        await loadConfig();
        
        // Initialiser la carte
        initializeMap();
        
        // Initialiser les événements
        initializeEventListeners();
        
        // Peupler les catégories initiales
        populateCategories();
        
        console.log('Application OSINT initialisée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        showError('Erreur lors de l\'initialisation de l\'application');
    }
});

// Configuration intégrée pour éviter les problèmes CORS
async function loadConfig() {
    config = {
        "categories": {
            "amenity": {
                "label": "Services et équipements",
                "types": {
                    "restaurant": "Restaurant",
                    "cafe": "Café",
                    "bar": "Bar",
                    "fast_food": "Restauration rapide",
                    "bank": "Banque",
                    "atm": "Distributeur automatique",
                    "hospital": "Hôpital",
                    "clinic": "Clinique",
                    "pharmacy": "Pharmacie",
                    "school": "École",
                    "university": "Université",
                    "library": "Bibliothèque",
                    "police": "Police",
                    "fire_station": "Caserne de pompiers",
                    "post_office": "Bureau de poste",
                    "townhall": "Mairie",
                    "fuel": "Station-service",
                    "parking": "Parking",
                    "church": "Église",
                    "mosque": "Mosquée",
                    "cinema": "Cinéma",
                    "theatre": "Théâtre"
                }
            },
            "highway": {
                "label": "Routes et transport",
                "types": {
                    "motorway": "Autoroute",
                    "trunk": "Route nationale",
                    "primary": "Route principale",
                    "secondary": "Route secondaire",
                    "tertiary": "Route tertiaire",
                    "residential": "Route résidentielle",
                    "service": "Route de service",
                    "pedestrian": "Zone piétonne",
                    "footway": "Chemin piéton",
                    "cycleway": "Piste cyclable",
                    "path": "Sentier",
                    "track": "Piste",
                    "bus_stop": "Arrêt de bus",
                    "traffic_signals": "Feux de circulation",
                    "stop": "Stop",
                    "give_way": "Cédez le passage",
                    "speed_camera": "Radar",
                    "toll_booth": "Péage",
                    "bridge": "Pont",
                    "tunnel": "Tunnel"
                }
            },
            "building": {
                "label": "Bâtiments",
                "types": {
                    "house": "Maison",
                    "apartment": "Appartement",
                    "residential": "Résidentiel",
                    "commercial": "Commercial",
                    "industrial": "Industriel",
                    "office": "Bureau",
                    "retail": "Commerce",
                    "warehouse": "Entrepôt",
                    "hospital": "Hôpital",
                    "school": "École",
                    "university": "Université",
                    "church": "Église",
                    "mosque": "Mosquée",
                    "hotel": "Hôtel",
                    "train_station": "Gare",
                    "public": "Public",
                    "government": "Gouvernement",
                    "military": "Militaire",
                    "police": "Police",
                    "fire_station": "Caserne de pompiers",
                    "stadium": "Stade",
                    "theatre": "Théâtre",
                    "cinema": "Cinéma",
                    "museum": "Musée",
                    "library": "Bibliothèque"
                }
            },
            "natural": {
                "label": "Éléments naturels",
                "types": {
                    "water": "Eau",
                    "coastline": "Côte",
                    "beach": "Plage",
                    "cliff": "Falaise",
                    "peak": "Sommet",
                    "volcano": "Volcan",
                    "cave_entrance": "Entrée de grotte",
                    "spring": "Source",
                    "tree": "Arbre",
                    "wood": "Bois",
                    "forest": "Forêt",
                    "grassland": "Prairie",
                    "wetland": "Zone humide",
                    "marsh": "Marais",
                    "rock": "Rocher",
                    "valley": "Vallée",
                    "bay": "Baie"
                }
            },
            "landuse": {
                "label": "Utilisation du sol",
                "types": {
                    "residential": "Résidentiel",
                    "commercial": "Commercial",
                    "industrial": "Industriel",
                    "retail": "Commerce de détail",
                    "education": "Éducation",
                    "military": "Militaire",
                    "quarry": "Carrière",
                    "railway": "Chemin de fer",
                    "port": "Port",
                    "airport": "Aéroport",
                    "forest": "Forêt",
                    "farmland": "Terre agricole",
                    "cemetery": "Cimetière"
                }
            },
            "leisure": {
                "label": "Loisirs et sport",
                "types": {
                    "park": "Parc",
                    "garden": "Jardin",
                    "playground": "Aire de jeux",
                    "sports_centre": "Centre sportif",
                    "stadium": "Stade",
                    "swimming_pool": "Piscine",
                    "swimming_pool_private": "Piscine privée",
                    "golf_course": "Terrain de golf",
                    "tennis": "Tennis",
                    "basketball": "Basketball",
                    "football": "Football",
                    "marina": "Marina",
                    "beach_resort": "Station balnéaire",
                    "theme_park": "Parc d'attractions",
                    "nature_reserve": "Réserve naturelle"
                }
            },
            "shop": {
                "label": "Commerces",
                "types": {
                    "supermarket": "Supermarché",
                    "convenience": "Épicerie",
                    "mall": "Centre commercial",
                    "bakery": "Boulangerie",
                    "butcher": "Boucherie",
                    "pharmacy": "Pharmacie",
                    "clothes": "Vêtements",
                    "shoes": "Chaussures",
                    "books": "Librairie",
                    "electronics": "Électronique",
                    "bicycle": "Vélo",
                    "car": "Automobile",
                    "fuel": "Carburant",
                    "hairdresser": "Coiffeur",
                    "florist": "Fleuriste"
                }
            },
            "tourism": {
                "label": "Tourisme",
                "types": {
                    "hotel": "Hôtel",
                    "motel": "Motel",
                    "guest_house": "Maison d'hôtes",
                    "hostel": "Auberge de jeunesse",
                    "camp_site": "Camping",
                    "attraction": "Attraction",
                    "museum": "Musée",
                    "gallery": "Galerie",
                    "zoo": "Zoo",
                    "viewpoint": "Point de vue",
                    "information": "Information touristique"
                }
            },
            "historic": {
                "label": "Sites historiques",
                "types": {
                    "monument": "Monument",
                    "memorial": "Mémorial",
                    "archaeological_site": "Site archéologique",
                    "castle": "Château",
                    "fort": "Fort",
                    "ruins": "Ruines",
                    "tower": "Tour",
                    "palace": "Palais"
                }
            },
            "military": {
                "label": "Sites militaires",
                "types": {
                    "airfield": "Terrain d'aviation militaire",
                    "bunker": "Bunker",
                    "barracks": "Caserne",
                    "naval_base": "Base navale",
                    "training_area": "Zone d'entraînement",
                    "checkpoint": "Poste de contrôle"
                }
            },
            "emergency": {
                "label": "Services d'urgence",
                "types": {
                    "ambulance_station": "Station d'ambulance",
                    "fire_hydrant": "Bouche d'incendie",
                    "defibrillator": "Défibrillateur",
                    "phone": "Téléphone d'urgence",
                    "siren": "Sirène"
                }
            },
            "railway": {
                "label": "Transport ferroviaire",
                "types": {
                    "station": "Gare",
                    "halt": "Halte",
                    "tram_stop": "Arrêt de tram",
                    "subway_entrance": "Entrée de métro",
                    "rail": "Rail",
                    "subway": "Métro",
                    "tram": "Tramway",
                    "light_rail": "Train léger",
                    "monorail": "Monorail",
                    "narrow_gauge": "Voie étroite",
                    "preserved": "Ligne préservée",
                    "funicular": "Funiculaire",
                    "miniature": "Train miniature",
                    "turntable": "Plaque tournante",
                    "roundhouse": "Rotonde",
                    "crossing": "Passage à niveau",
                    "level_crossing": "Passage à niveau",
                    "signal": "Signal",
                    "switch": "Aiguillage",
                    "railway_crossing": "Croisement ferroviaire",
                    "buffer_stop": "Butoir"
                }
            },
            "public_transport": {
                "label": "Transport public",
                "types": {
                    "stop_position": "Position d'arrêt",
                    "platform": "Quai",
                    "station": "Station",
                    "stop_area": "Zone d'arrêt"
                }
            }
        },
        "geographicZones": {
            "continent": {
                "Europe": { "query": "area[\"name:en\"=\"Europe\"];", "lat": 54.5260, "lon": 15.2551 },
                "Amérique du Nord": { "query": "area[\"name:en\"=\"North America\"];", "lat": 45.0, "lon": -100.0 },
                "Asie": { "query": "area[\"name:en\"=\"Asia\"];", "lat": 34.0479, "lon": 100.6197 },
                "Afrique": { "query": "area[\"name:en\"=\"Africa\"];", "lat": -8.7832, "lon": 34.5085 },
                "Amérique du Sud": { "query": "area[\"name:en\"=\"South America\"];", "lat": -8.7832, "lon": -55.4915 },
                "Océanie": { "query": "area[\"name:en\"=\"Oceania\"];", "lat": -25.2744, "lon": 133.7751 }
            },
            "country": {
                "France": { "query": "area[\"ISO3166-1\"=\"FR\"][admin_level=2];", "lat": 46.2276, "lon": 2.2137 },
                "Allemagne": { "query": "area[\"ISO3166-1\"=\"DE\"][admin_level=2];", "lat": 51.1657, "lon": 10.4515 },
                "Espagne": { "query": "area[\"ISO3166-1\"=\"ES\"][admin_level=2];", "lat": 40.4637, "lon": -3.7492 },
                "Italie": { "query": "area[\"ISO3166-1\"=\"IT\"][admin_level=2];", "lat": 41.8719, "lon": 12.5674 },
                "Royaume-Uni": { "query": "area[\"ISO3166-1\"=\"GB\"][admin_level=2];", "lat": 55.3781, "lon": -3.4360 },
                "Belgique": { "query": "area[\"ISO3166-1\"=\"BE\"][admin_level=2];", "lat": 50.5039, "lon": 4.4699 },
                "Suisse": { "query": "area[\"ISO3166-1\"=\"CH\"][admin_level=2];", "lat": 46.8182, "lon": 8.2275 },
                "États-Unis": { "query": "area[\"ISO3166-1\"=\"US\"][admin_level=2];", "lat": 39.8283, "lon": -98.5795 },
                "Canada": { "query": "area[\"ISO3166-1\"=\"CA\"][admin_level=2];", "lat": 56.1304, "lon": -106.3468 }
            },
            "region": {
                "Île-de-France": { "query": "area[\"name\"=\"Île-de-France\"][admin_level=4];", "lat": 48.8499, "lon": 2.6370 },
                "Provence-Alpes-Côte d'Azur": { "query": "area[\"name\"=\"Provence-Alpes-Côte d'Azur\"][admin_level=4];", "lat": 43.9352, "lon": 6.0679 },
                "Auvergne-Rhône-Alpes": { "query": "area[\"name\"=\"Auvergne-Rhône-Alpes\"][admin_level=4];", "lat": 45.7640, "lon": 4.8357 },
                "Nouvelle-Aquitaine": { "query": "area[\"name\"=\"Nouvelle-Aquitaine\"][admin_level=4];", "lat": 45.7640, "lon": 0.8357 },
                "Occitanie": { "query": "area[\"name\"=\"Occitanie\"][admin_level=4];", "lat": 43.6047, "lon": 1.4442 },
                "Hauts-de-France": { "query": "area[\"name\"=\"Hauts-de-France\"][admin_level=4];", "lat": 50.4801, "lon": 2.7931 },
                "Grand Est": { "query": "area[\"name\"=\"Grand Est\"][admin_level=4];", "lat": 48.7000, "lon": 6.2000 },
                "Pays de la Loire": { "query": "area[\"name\"=\"Pays de la Loire\"][admin_level=4];", "lat": 47.4630, "lon": -0.7516 },
                "Bretagne": { "query": "area[\"name\"=\"Bretagne\"][admin_level=4];", "lat": 48.2020, "lon": -2.9326 },
                "Normandie": { "query": "area[\"name\"=\"Normandie\"][admin_level=4];", "lat": 49.1829, "lon": 0.3707 }
            },
            "city": {
                "Paris": { "query": "area[\"name\"=\"Paris\"][admin_level=8];", "lat": 48.8566, "lon": 2.3522 },
                "Lyon": { "query": "area[\"name\"=\"Lyon\"][admin_level=8];", "lat": 45.7640, "lon": 4.8357 },
                "Marseille": { "query": "area[\"name\"=\"Marseille\"][admin_level=8];", "lat": 43.2965, "lon": 5.3698 },
                "Toulouse": { "query": "area[\"name\"=\"Toulouse\"][admin_level=8];", "lat": 43.6047, "lon": 1.4442 },
                "Nice": { "query": "area[\"name\"=\"Nice\"][admin_level=8];", "lat": 43.7102, "lon": 7.2620 },
                "Nantes": { "query": "area[\"name\"=\"Nantes\"][admin_level=8];", "lat": 47.2184, "lon": -1.5536 },
                "Strasbourg": { "query": "area[\"name\"=\"Strasbourg\"][admin_level=8];", "lat": 48.5734, "lon": 7.7521 },
                "Montpellier": { "query": "area[\"name\"=\"Montpellier\"][admin_level=8];", "lat": 43.6110, "lon": 3.8767 },
                "Bordeaux": { "query": "area[\"name\"=\"Bordeaux\"][admin_level=8];", "lat": 44.8378, "lon": -0.5792 },
                "Lille": { "query": "area[\"name\"=\"Lille\"][admin_level=8];", "lat": 50.6292, "lon": 3.0573 }
            }
        },
        "defaultLocation": {
            "lat": 48.8566,
            "lon": 2.3522,
            "name": "Paris, France"
        },
        "overpassServers": [
            "https://overpass-api.de/api/interpreter",
            "https://overpass.kumi.systems/api/interpreter",
            "https://overpass.openstreetmap.ru/api/interpreter"
        ]
    };
}

// Initialiser la carte Leaflet
function initializeMap() {
    try {
        const defaultLoc = config.defaultLocation;
        map = L.map('map').setView([defaultLoc.lat, defaultLoc.lon], 13);
        
        // Ajouter les tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Créer un groupe de marqueurs
        markersLayer = L.layerGroup().addTo(map);
        
        console.log('Carte initialisée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la carte:', error);
        showError('Erreur lors de l\'initialisation de la carte');
    }
}

// Initialiser tous les événements
function initializeEventListeners() {
    const form = document.getElementById('searchForm');
    const addComplementBtn = document.getElementById('addComplement');
    const clearAllBtn = document.getElementById('clearAll');
    const copyQueryBtn = document.getElementById('copyQuery');
    
    // Événements du formulaire
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('change', handleFormChange);
    form.addEventListener('input', handleFormChange);
    
    // Boutons de contrôle
    addComplementBtn.addEventListener('click', addComplement);
    clearAllBtn.addEventListener('click', clearAllConditions);
    copyQueryBtn.addEventListener('click', copyQueryToClipboard);
    
        // Initialiser l'interface après un délai
        setTimeout(() => {
            initializeBboxControls();
            populateMainCategories();
            initializeAddressSearch();
        }, 100);
}

// Peupler les catégories dans le premier dropdown
function populateCategories() {
    const categorySelect = document.querySelector('.category');
    if (!categorySelect) return;
    
    // Vider les options existantes sauf la première
    categorySelect.innerHTML = '<option value="">Sélectionner une catégorie</option>';
    
    // Ajouter les catégories depuis la configuration
    Object.keys(config.categories).forEach(categoryKey => {
        const category = config.categories[categoryKey];
        const option = document.createElement('option');
        option.value = categoryKey;
        option.textContent = category.label;
        categorySelect.appendChild(option);
    });
}

// Gérer les changements dans le formulaire
function handleFormChange(event) {
    if (event.target.classList.contains('category')) {
        updateTypesContainer(event.target);
    } else if (event.target.classList.contains('name-mode')) {
        updateNameInput(event.target);
    }
}

// Mettre à jour le container des types avec cases à cocher
function updateTypesContainer(categorySelect) {
    const typesContainer = categorySelect.closest('.condition-fields').querySelector('.types-container');
    if (!typesContainer) return;
    
    const selectedCategory = categorySelect.value;
    
    // Vider le container
    typesContainer.innerHTML = '';
    
    if (!selectedCategory || !config.categories[selectedCategory]) {
        typesContainer.innerHTML = '<p class="no-types">Sélectionnez d\'abord une catégorie</p>';
        typesContainer.classList.add('empty');
        return;
    }
    
    typesContainer.classList.remove('empty');
    const types = config.categories[selectedCategory].types;
    
    // Générer un ID unique basé sur le contexte
    let uniqueId;
    if (categorySelect.closest('.main-search')) {
        uniqueId = 'main';
    } else if (categorySelect.closest('.complement-item')) {
        const complementItem = categorySelect.closest('.complement-item');
        uniqueId = complementItem.id.replace('complement', 'comp');
    } else {
        uniqueId = 'default';
    }
    
    Object.keys(types).forEach(typeKey => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'type-checkbox';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `type_${uniqueId}_${typeKey}`;
        checkbox.value = typeKey;
        checkbox.name = `types_${uniqueId}`;
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = `${types[typeKey]} (${selectedCategory}=${typeKey})`;
        
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        typesContainer.appendChild(checkboxDiv);
    });
}

// Mettre à jour l'input de nom selon le mode sélectionné
function updateNameInput(nameModeSelect) {
    const nameInput = nameModeSelect.parentElement.querySelector('.name');
    if (!nameInput) return;
    
    const mode = nameModeSelect.value;
    
    if (mode === '') {
        nameInput.disabled = true;
        nameInput.value = '';
        nameInput.placeholder = 'Texte à rechercher';
    } else {
        nameInput.disabled = false;
        switch (mode) {
            case 'exact':
                nameInput.placeholder = 'Nom exact à rechercher';
                break;
            case 'contains':
                nameInput.placeholder = 'Texte contenu dans le nom';
                break;
            case 'starts':
                nameInput.placeholder = 'Début du nom';
                break;
        }
    }
}

// Ajouter une nouvelle condition
function addCondition() {
    conditionCount++;
    
    const conditionsContainer = document.getElementById('conditionsContainer');
    const newConditionGroup = document.createElement('div');
    newConditionGroup.className = 'condition-group';
    newConditionGroup.id = `conditionGroup${conditionCount}`;
    
    newConditionGroup.innerHTML = `
        <div class="condition" id="condition${conditionCount}">
            <div class="condition-header">
                <span class="condition-number">Condition ${conditionCount}</span>
                <button type="button" class="remove-condition" onclick="removeCondition(${conditionCount})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="condition-fields">
                <div class="field-group">
                    <label>Catégorie :</label>
                    <select class="category" name="category${conditionCount}" required>
                        <option value="">Sélectionner une catégorie</option>
                    </select>
                </div>
                
                <div class="field-group">
                    <label>Types (sélection multiple) :</label>
                    <div class="types-container" name="types${conditionCount}">
                        <p class="no-types">Sélectionnez d'abord une catégorie</p>
                    </div>
                </div>
                
                <div class="field-group">
                    <label>Recherche par nom (optionnel) :</label>
                    <div class="name-search">
                        <select class="name-mode" name="nameMode${conditionCount}">
                            <option value="">Ignorer le nom</option>
                            <option value="exact">Nom exact</option>
                            <option value="contains">Contient</option>
                            <option value="starts">Commence par</option>
                        </select>
                        <input type="text" class="name" name="name${conditionCount}" placeholder="Texte à rechercher" disabled>
                    </div>
                </div>
                
                <div class="field-group">
                    <label>Distance de recherche :</label>
                    <div class="distance-input">
                        <input type="number" class="distance" name="distance${conditionCount}" min="1" max="50000" value="1000">
                        <span class="unit">mètres</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    conditionsContainer.appendChild(newConditionGroup);
    
    // Peupler les catégories pour la nouvelle condition
    const newCategorySelect = newConditionGroup.querySelector('.category');
    populateCategorySelect(newCategorySelect);
    
    // Afficher le bouton de suppression pour toutes les conditions sauf la première
    updateRemoveButtons();
}

// Peupler un select de catégorie spécifique
function populateCategorySelect(categorySelect) {
    categorySelect.innerHTML = '<option value="">Sélectionner une catégorie</option>';
    
    Object.keys(config.categories).forEach(categoryKey => {
        const category = config.categories[categoryKey];
        const option = document.createElement('option');
        option.value = categoryKey;
        option.textContent = category.label;
        categorySelect.appendChild(option);
    });
}

// Supprimer une condition
function removeCondition(conditionNumber) {
    const conditionGroup = document.getElementById(`conditionGroup${conditionNumber}`);
    if (conditionGroup) {
        conditionGroup.remove();
        updateRemoveButtons();
    }
}

// Mettre à jour la visibilité des boutons de suppression
function updateRemoveButtons() {
    const conditionGroups = document.querySelectorAll('.condition-group');
    conditionGroups.forEach((group, index) => {
        const removeBtn = group.querySelector('.remove-condition');
        if (removeBtn) {
            removeBtn.style.display = conditionGroups.length > 1 ? 'flex' : 'none';
        }
    });
}

// Effacer toutes les conditions
function clearAllConditions() {
    const conditionsContainer = document.getElementById('conditionsContainer');
    conditionsContainer.innerHTML = `
        <div class="condition-group" id="conditionGroup1">
            <div class="condition" id="condition1">
                <div class="condition-header">
                    <span class="condition-number">Condition 1</span>
                    <button type="button" class="remove-condition" onclick="removeCondition(1)" style="display:none;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="condition-fields">
                    <div class="field-group">
                        <label>Catégorie :</label>
                        <select class="category" name="category1" required>
                            <option value="">Sélectionner une catégorie</option>
                        </select>
                    </div>
                    
                    <div class="field-group">
                        <label>Types (sélection multiple) :</label>
                        <div class="types-container" name="types1">
                            <p class="no-types">Sélectionnez d'abord une catégorie</p>
                        </div>
                    </div>
                    
                    <div class="field-group">
                        <label>Recherche par nom (optionnel) :</label>
                        <div class="name-search">
                            <select class="name-mode" name="nameMode1">
                                <option value="">Ignorer le nom</option>
                                <option value="exact">Nom exact</option>
                                <option value="contains">Contient</option>
                                <option value="starts">Commence par</option>
                            </select>
                            <input type="text" class="name" name="name1" placeholder="Texte à rechercher" disabled>
                        </div>
                    </div>
                    
                    <div class="field-group">
                        <label>Distance de recherche :</label>
                        <div class="distance-input">
                            <input type="number" class="distance" name="distance1" min="100" max="50000" value="1000">
                            <span class="unit">mètres</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    conditionCount = 1;
    populateCategories();
    clearResults();
    document.getElementById('queryDisplay').textContent = '';
}

// Ajouter un opérateur logique
function addOperator(operator) {
    const queryDisplay = document.getElementById('queryDisplay');
    const currentQuery = queryDisplay.textContent;
    
    if (currentQuery.trim()) {
        queryDisplay.textContent = currentQuery + ' ' + operator + ' ';
    } else {
        queryDisplay.textContent = operator + ' ';
    }
}

// Gérer la soumission du formulaire
async function handleFormSubmit(event) {
    event.preventDefault();
    
    try {
        showLoading(true);
        
        // Construire la requête selon le nouveau style
        const query = buildNewStyleQuery();
        
        // Afficher la requête
        document.getElementById('queryDisplay').textContent = query;
        
        // Exécuter la recherche
        const results = await executeOverpassQuery(query);
        
        // Afficher les résultats
        displayResults(results);
        
        // Préparer les exports
        prepareExports(results);
        
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        showError('Erreur lors de la recherche: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Collecter toutes les conditions du formulaire (mode standard)
function collectConditions() {
    const conditions = [];
    const conditionGroups = document.querySelectorAll('.condition-group');
    
    conditionGroups.forEach((group, index) => {
        const condition = group.querySelector('.condition');
        const conditionId = condition.id.replace('condition', '');
        
        const category = condition.querySelector('.category').value;
        const distance = condition.querySelector('.distance').value;
        
        // Collecter les types sélectionnés (cases à cocher)
        const selectedTypes = [];
        const typeCheckboxes = condition.querySelectorAll('.types-container input[type="checkbox"]:checked');
        typeCheckboxes.forEach(checkbox => {
            selectedTypes.push(checkbox.value);
        });
        
        // Collecter les informations de recherche par nom
        const nameMode = condition.querySelector('.name-mode').value;
        const nameValue = condition.querySelector('.name').value;
        
        if (category) {
            conditions.push({
                id: conditionId,
                category,
                types: selectedTypes,
                nameMode,
                nameValue,
                distance: distance || 1000
            });
        }
    });
    
    return conditions;
}

// Construire la requête Overpass (mode standard)
function buildOverpassQuery(conditions) {
    let query = '[out:json][timeout:25];\n(\n';
    
    conditions.forEach((condition, index) => {
        const { category, types, nameMode, nameValue, distance } = condition;
        
        // Déterminer la zone de recherche
        const defaultLoc = config.defaultLocation;
        const area = `(around:${distance},${defaultLoc.lat},${defaultLoc.lon})`;
        
        // Construire la requête pour cette condition
        let conditionQuery = '';
        
        if (types && types.length > 0) {
            // Recherche avec types spécifiques sélectionnés (OU entre les types)
            types.forEach(type => {
                conditionQuery += `  node["${category}"="${type}"]${area};\n`;
                conditionQuery += `  way["${category}"="${type}"]${area};\n`;
                conditionQuery += `  relation["${category}"="${type}"]${area};\n`;
            });
        } else {
            // Recherche par catégorie seulement (tous les types)
            conditionQuery = `  node["${category}"]${area};\n`;
            conditionQuery += `  way["${category}"]${area};\n`;
            conditionQuery += `  relation["${category}"]${area};\n`;
        }
        
        // Ajouter le filtre par nom si spécifié
        if (nameMode && nameValue && nameValue.trim()) {
            let nameFilter = '';
            switch (nameMode) {
                case 'exact':
                    nameFilter = `["name"="${nameValue}"]`;
                    break;
                case 'contains':
                    nameFilter = `["name"~"${nameValue}",i]`;
                    break;
                case 'starts':
                    nameFilter = `["name"~"^${nameValue}",i]`;
                    break;
            }
            
            if (nameFilter) {
                conditionQuery = conditionQuery.replace(/\](\(around:[^)]+\));/g, `]${nameFilter}$1;`);
            }
        }
        
        query += conditionQuery;
    });
    
    query += ');\nout geom;';
    
    return query;
}

// Exécuter la requête Overpass
async function executeOverpassQuery(query) {
    const servers = config.overpassServers || ['https://overpass-api.de/api/interpreter'];
    
    for (let serverUrl of servers) {
        try {
            console.log(`Tentative de requête sur ${serverUrl}`);
            
            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `data=${encodeURIComponent(query)}`
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.elements) {
                console.log(`Requête réussie sur ${serverUrl}, ${data.elements.length} éléments trouvés`);
                return data;
            } else {
                throw new Error('Réponse invalide du serveur');
            }
            
        } catch (error) {
            console.warn(`Échec sur ${serverUrl}:`, error);
            if (serverUrl === servers[servers.length - 1]) {
                throw new Error('Tous les serveurs Overpass sont indisponibles');
            }
        }
    }
}

// Afficher les résultats sur la carte
function displayResults(data) {
    // Effacer les marqueurs existants
    markersLayer.clearLayers();
    
    const elements = data.elements || [];
    currentResults = elements;
    
    // Obtenir les données de recherche pour identifier les types d'éléments
    const searchData = collectMainSearchAndComplements();
    
    // Créer les marqueurs et compter les éléments valides
    const bounds = [];
    let validElementsCount = 0;
    const validElements = [];
    
    // Couleurs pour différencier les types d'éléments
    const markerColors = {
        main: 'blue',      // Éléments principaux en bleu
        complement1: 'green',   // Premier complément en vert
        complement2: 'orange',  // Deuxième complément en orange
        complement3: 'red',     // Troisième complément en rouge
        complement4: 'violet',  // Quatrième complément en violet
        complement5: 'yellow'   // Cinquième complément en jaune
    };
    
    elements.forEach((element, index) => {
        let lat, lon;
        
        // Déterminer les coordonnées selon le type d'élément
        if (element.type === 'node') {
            lat = element.lat;
            lon = element.lon;
        } else if (element.type === 'way' && element.geometry) {
            // Prendre le centre du way
            const coords = element.geometry;
            lat = coords.reduce((sum, coord) => sum + coord.lat, 0) / coords.length;
            lon = coords.reduce((sum, coord) => sum + coord.lon, 0) / coords.length;
        } else if (element.type === 'relation' && element.members) {
            // Ignorer les relations pour l'instant
            return;
        } else {
            return;
        }
        
        if (lat && lon) {
            validElementsCount++;
            bounds.push([lat, lon]);
            
            // Ajouter les coordonnées à l'élément pour la liste
            element.calculatedLat = lat;
            element.calculatedLon = lon;
            element.resultIndex = validElementsCount - 1;
            
            // Déterminer le type d'élément (principal ou complément)
            const elementType = determineElementType(element, searchData);
            element.elementType = elementType;
            
            validElements.push(element);
            
            // Choisir la couleur du marqueur selon le type
            const markerColor = markerColors[elementType] || 'blue';
            
            // Créer le marqueur avec la couleur appropriée
            const marker = L.marker([lat, lon], {
                icon: L.icon({
                    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${markerColor}.png`,
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            });
            
            // Créer le popup
            const tags = element.tags || {};
            const name = tags.name || 'Sans nom';
            const category = Object.keys(tags).find(key => config.categories[key]) || 'Inconnu';
            const type = tags[category] || 'Non spécifié';
            
            // Ajouter l'information du type d'élément dans le popup
            const elementTypeLabel = getElementTypeLabel(elementType);
            
            const popupContent = `
                <div>
                    <h4>${name}</h4>
                    <p><strong>Type:</strong> ${type}</p>
                    <p><strong>Catégorie:</strong> ${category}</p>
                    <p><strong>Rôle:</strong> <span style="color: ${markerColor}; font-weight: bold;">${elementTypeLabel}</span></p>
                    <p><strong>Coordonnées:</strong> ${lat.toFixed(6)}, ${lon.toFixed(6)}</p>
                    <div style="margin-top: 10px;">
                        <a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=18" target="_blank" style="margin-right: 10px;">
                            <i class="fas fa-map"></i> Voir sur OSM
                        </a>
                        <a href="https://www.google.com/maps/@${lat},${lon},18z" target="_blank">
                            <i class="fas fa-street-view"></i> Street View
                        </a>
                    </div>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            
            // Stocker la référence de l'élément dans le marqueur
            marker.elementData = element;
            
            // Ajouter le clic droit pour les liens
            marker.on('contextmenu', () => {
                window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=18`, '_blank');
            });
            
            markersLayer.addLayer(marker);
        }
    });
    
    // Afficher le nombre de résultats valides avec répartition par type
    const resultsCount = document.getElementById('resultsCount');
    const typeBreakdown = getResultsBreakdown(validElements);
    resultsCount.innerHTML = `${validElementsCount} résultat(s) trouvé(s)<br><small>${typeBreakdown}</small>`;
    resultsCount.style.display = 'block';
    
    if (validElementsCount === 0) {
        showError('Aucun résultat trouvé pour cette recherche');
        hideResultsList();
        return;
    }
    
    // Ajuster la vue de la carte pour inclure tous les marqueurs
    if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [20, 20] });
    }
    
    // Afficher la liste des résultats
    populateResultsList(validElements);
}

// Déterminer le type d'élément (principal ou complément)
function determineElementType(element, searchData) {
    const tags = element.tags || {};
    
    // Vérifier si c'est un élément principal
    if (searchData.mainSearch) {
        const mainCategory = searchData.mainSearch.category;
        const mainTypes = searchData.mainSearch.types || [];
        
        if (tags[mainCategory]) {
            if (mainTypes.length === 0 || mainTypes.includes(tags[mainCategory])) {
                // Vérifier aussi le nom si spécifié
                if (searchData.mainSearch.nameMode && searchData.mainSearch.nameValue) {
                    const nameValue = searchData.mainSearch.nameValue.toLowerCase();
                    const elementName = (tags.name || '').toLowerCase();
                    
                    switch (searchData.mainSearch.nameMode) {
                        case 'exact':
                            if (elementName === nameValue) return 'main';
                            break;
                        case 'contains':
                            if (elementName.includes(nameValue)) return 'main';
                            break;
                        case 'starts':
                            if (elementName.startsWith(nameValue)) return 'main';
                            break;
                    }
                } else {
                    return 'main';
                }
            }
        }
    }
    
    // Vérifier si c'est un élément de complément
    for (let i = 0; i < searchData.complements.length; i++) {
        const complement = searchData.complements[i];
        const complementCategory = complement.category;
        const complementTypes = complement.types || [];
        
        if (tags[complementCategory]) {
            if (complementTypes.length === 0 || complementTypes.includes(tags[complementCategory])) {
                // Vérifier aussi le nom si spécifié
                if (complement.nameMode && complement.nameValue) {
                    const nameValue = complement.nameValue.toLowerCase();
                    const elementName = (tags.name || '').toLowerCase();
                    
                    switch (complement.nameMode) {
                        case 'exact':
                            if (elementName === nameValue) return `complement${i + 1}`;
                            break;
                        case 'contains':
                            if (elementName.includes(nameValue)) return `complement${i + 1}`;
                            break;
                        case 'starts':
                            if (elementName.startsWith(nameValue)) return `complement${i + 1}`;
                            break;
                    }
                } else {
                    return `complement${i + 1}`;
                }
            }
        }
    }
    
    // Par défaut, considérer comme élément principal
    return 'main';
}

// Obtenir le libellé du type d'élément
function getElementTypeLabel(elementType) {
    switch (elementType) {
        case 'main':
            return '🎯 Résultat principal';
        case 'complement1':
            return '🟢 Complément 1';
        case 'complement2':
            return '🟠 Complément 2';
        case 'complement3':
            return '🔴 Complément 3';
        case 'complement4':
            return '🟣 Complément 4';
        case 'complement5':
            return '🟡 Complément 5';
        default:
            return '📍 Élément';
    }
}

// Obtenir la répartition des résultats par type
function getResultsBreakdown(elements) {
    const breakdown = {};
    
    elements.forEach(element => {
        const type = element.elementType || 'main';
        breakdown[type] = (breakdown[type] || 0) + 1;
    });
    
    const parts = [];
    if (breakdown.main) {
        parts.push(`🎯 ${breakdown.main} principal(aux)`);
    }
    
    for (let i = 1; i <= 5; i++) {
        const key = `complement${i}`;
        if (breakdown[key]) {
            const colors = ['🟢', '🟠', '🔴', '🟣', '🟡'];
            parts.push(`${colors[i-1]} ${breakdown[key]} complément ${i}`);
        }
    }
    
    return parts.join(' • ');
}

// Peupler la liste des résultats avec séparation
function populateResultsList(elements) {
    const resultsListContainer = document.getElementById('resultsListContainer');
    const mainResultsTableBody = document.getElementById('mainResultsTableBody');
    const complementResultsTableBody = document.getElementById('complementResultsTableBody');
    const complementResultsSection = document.getElementById('complementResultsSection');
    
    if (!resultsListContainer || !mainResultsTableBody || !complementResultsTableBody) return;
    
    // Vider les tables existantes
    mainResultsTableBody.innerHTML = '';
    complementResultsTableBody.innerHTML = '';
    
    // Séparer les éléments principaux des compléments
    const mainElements = elements.filter(element => element.elementType === 'main');
    const complementElements = elements.filter(element => element.elementType !== 'main');
    
    // Peupler la table des résultats principaux
    mainElements.forEach((element, index) => {
        const row = createResultRow(element, index, false);
        mainResultsTableBody.appendChild(row);
    });
    
    // Peupler la table des compléments si il y en a
    if (complementElements.length > 0) {
        complementElements.forEach((element, index) => {
            const globalIndex = mainElements.length + index; // Index global pour le zoom
            const row = createResultRow(element, globalIndex, true);
            complementResultsTableBody.appendChild(row);
        });
        
        // Afficher la section des compléments
        complementResultsSection.style.display = 'block';
    } else {
        // Masquer la section des compléments
        complementResultsSection.style.display = 'none';
    }
    
    // Afficher la liste
    resultsListContainer.style.display = 'block';
    
    // Stocker les éléments pour les fonctions de zoom
    window.currentValidElements = elements;
}

// Créer une ligne de résultat
function createResultRow(element, index, isComplement) {
    const tags = element.tags || {};
    const name = tags.name || 'Sans nom';
    const category = Object.keys(tags).find(key => config.categories[key]) || 'Inconnu';
    const type = tags[category] || 'Non spécifié';
    const categoryLabel = config.categories[category]?.label || category;
    const typeLabel = config.categories[category]?.types[type] || type;
    
    const lat = element.calculatedLat;
    const lon = element.calculatedLon;
    
    const row = document.createElement('tr');
    row.dataset.elementId = element.id;
    row.dataset.resultIndex = index;
    
    // Contenu de base pour toutes les lignes
    let rowContent = '';
    
    // Ajouter la colonne "Rôle" pour les compléments
    if (isComplement) {
        const elementTypeLabel = getElementTypeLabel(element.elementType);
        rowContent += `
            <td>
                <div class="result-role">${elementTypeLabel}</div>
            </td>
        `;
    }
    
    // Colonnes communes
    rowContent += `
        <td>
            <div class="result-name" title="${name}">${name}</div>
        </td>
        <td>
            <div class="result-type">${typeLabel}</div>
        </td>
        <td>
            <div class="result-category">${category}=${type}</div>
        </td>
        <td>
            <div class="result-coords">${lat.toFixed(6)}, ${lon.toFixed(6)}</div>
        </td>
        <td>
            <div class="result-actions">
                <button class="zoom-btn" onclick="zoomToResult(${index})" title="Zoomer sur la carte">
                    <i class="fas fa-search-plus"></i>
                </button>
                <a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=18" target="_blank" class="external-link" title="Voir sur OSM">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </td>
    `;
    
    row.innerHTML = rowContent;
    
    // Ajouter l'événement de clic sur la ligne
    row.addEventListener('click', function() {
        selectResultRow(this);
        zoomToResult(index);
    });
    
    return row;
}

// Zoomer sur un résultat spécifique
function zoomToResult(resultIndex) {
    if (!window.currentValidElements || !window.currentValidElements[resultIndex]) return;
    
    const element = window.currentValidElements[resultIndex];
    const lat = element.calculatedLat;
    const lon = element.calculatedLon;
    
    if (!lat || !lon) return;
    
    // Zoomer sur l'élément
    map.setView([lat, lon], 18);
    
    // Trouver et ouvrir le popup du marqueur correspondant
    markersLayer.eachLayer(marker => {
        if (marker.elementData && marker.elementData.id === element.id) {
            marker.openPopup();
            
            // Effet visuel temporaire
            const originalIcon = marker.getIcon();
            const highlightIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            
            marker.setIcon(highlightIcon);
            
            // Restaurer l'icône originale après 2 secondes
            setTimeout(() => {
                marker.setIcon(originalIcon);
            }, 2000);
        }
    });
    
    // Sélectionner la ligne correspondante dans la table
    const rows = document.querySelectorAll('#resultsTable tbody tr');
    rows.forEach(row => {
        if (parseInt(row.dataset.resultIndex) === resultIndex) {
            selectResultRow(row);
        }
    });
    
    showSuccess(`Zoom sur : ${element.tags?.name || 'Élément sélectionné'}`);
}

// Sélectionner une ligne de résultat
function selectResultRow(row) {
    // Désélectionner toutes les autres lignes dans toutes les tables
    const allRows = document.querySelectorAll('#mainResultsTable tbody tr, #complementResultsTable tbody tr');
    allRows.forEach(r => r.classList.remove('selected'));
    
    // Sélectionner la ligne cliquée
    row.classList.add('selected');
    
    // Faire défiler pour s'assurer que la ligne est visible
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Masquer la liste des résultats
function hideResultsList() {
    const resultsListContainer = document.getElementById('resultsListContainer');
    if (resultsListContainer) {
        resultsListContainer.style.display = 'none';
    }
    
    // Nettoyer les données
    window.currentValidElements = null;
}

// Préparer les exports
function prepareExports(data) {
    const downloadReportBtn = document.getElementById('downloadReport');
    const downloadCSVBtn = document.getElementById('downloadCSV');
    
    // Supprimer les anciens événements
    downloadReportBtn.replaceWith(downloadReportBtn.cloneNode(true));
    downloadCSVBtn.replaceWith(downloadCSVBtn.cloneNode(true));
    
    // Récupérer les nouveaux éléments
    const newDownloadReportBtn = document.getElementById('downloadReport');
    const newDownloadCSVBtn = document.getElementById('downloadCSV');
    
    // Ajouter les événements de clic
    newDownloadReportBtn.addEventListener('click', () => exportJSON(data));
    newDownloadCSVBtn.addEventListener('click', () => exportCSV(data));
    
    // Afficher les boutons
    newDownloadReportBtn.style.display = 'inline-flex';
    newDownloadCSVBtn.style.display = 'inline-flex';
}

// Exporter en JSON
function exportJSON(data) {
    const jsonReport = {
        timestamp: new Date().toISOString(),
        query: document.getElementById('queryDisplay').textContent,
        resultsCount: data.elements.length,
        boundingBox: boundingBox,
        elements: data.elements
    };
    
    const jsonContent = JSON.stringify(jsonReport, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `osint-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showSuccess('Rapport JSON téléchargé avec succès');
}

// Exporter en CSV
function exportCSV(data) {
    const csvContent = generateCSV(data.elements);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `osint-results-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showSuccess('Fichier CSV téléchargé avec succès');
}

// Générer le contenu CSV
function generateCSV(elements) {
    const headers = ['ID', 'Type', 'Nom', 'Catégorie', 'Sous-type', 'Latitude', 'Longitude', 'Tags'];
    let csv = headers.join(',') + '\n';
    
    elements.forEach(element => {
        const tags = element.tags || {};
        const name = (tags.name || '').replace(/"/g, '""');
        const category = Object.keys(tags).find(key => config.categories[key]) || '';
        const subtype = tags[category] || '';
        
        let lat = '', lon = '';
        if (element.type === 'node') {
            lat = element.lat;
            lon = element.lon;
        } else if (element.type === 'way' && element.geometry) {
            const coords = element.geometry;
            lat = coords.reduce((sum, coord) => sum + coord.lat, 0) / coords.length;
            lon = coords.reduce((sum, coord) => sum + coord.lon, 0) / coords.length;
        }
        
        const tagsStr = JSON.stringify(tags).replace(/"/g, '""');
        
        const row = [
            element.id,
            element.type,
            `"${name}"`,
            category,
            subtype,
            lat,
            lon,
            `"${tagsStr}"`
        ];
        
        csv += row.join(',') + '\n';
    });
    
    return csv;
}

// Copier la requête dans le presse-papiers
async function copyQueryToClipboard() {
    const query = document.getElementById('queryDisplay').textContent;
    
    if (!query.trim()) {
        showError('Aucune requête à copier');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(query);
        showSuccess('Requête copiée dans le presse-papiers');
    } catch (error) {
        console.error('Erreur lors de la copie:', error);
        showError('Impossible de copier la requête');
    }
}

// Effacer les résultats
function clearResults() {
    if (markersLayer) {
        markersLayer.clearLayers();
    }
    
    document.getElementById('resultsCount').style.display = 'none';
    document.getElementById('downloadReport').style.display = 'none';
    document.getElementById('downloadCSV').style.display = 'none';
    
    currentResults = [];
}

// Afficher/masquer l'indicateur de chargement
function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = show ? 'block' : 'none';
}

// Afficher un message d'erreur
function showError(message) {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    
    const container = document.querySelector('.search-panel');
    container.insertBefore(errorDiv, container.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Afficher un message de succès
function showSuccess(message) {
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    const container = document.querySelector('.search-panel');
    container.insertBefore(successDiv, container.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Gérer le changement de mode de recherche
function handleSearchModeChange(event) {
    const searchMode = event.target.value;
    const conditionsContainer = document.getElementById('conditionsContainer');
    const operatorsDiv = document.querySelector('.operators');
    
    if (searchMode === 'proximity') {
        // Mode proximité croisée : adapter l'interface
        updateInterfaceForProximityMode();
        operatorsDiv.style.display = 'none'; // Masquer les opérateurs logiques
    } else {
        // Mode standard : interface normale
        updateInterfaceForStandardMode();
        operatorsDiv.style.display = 'flex'; // Afficher les opérateurs logiques
    }
    
    // Effacer les conditions existantes et recommencer
    clearAllConditions();
}

// Adapter l'interface pour le mode proximité croisée
function updateInterfaceForProximityMode() {
    const conditionGroups = document.querySelectorAll('.condition-group');
    conditionGroups.forEach((group, index) => {
        const conditionHeader = group.querySelector('.condition-number');
        if (index === 0) {
            conditionHeader.textContent = 'Éléments à rechercher';
        } else {
            conditionHeader.textContent = `Critère de proximité ${index}`;
        }
        
        // Ajouter des champs spécifiques au mode proximité
        addProximityFields(group, index);
    });
    
    // Mettre à jour le texte du bouton d'ajout
    const addConditionBtn = document.getElementById('addCondition');
    if (addConditionBtn) {
        addConditionBtn.innerHTML = '<i class="fas fa-plus"></i> Ajouter un critère de proximité';
    }
}

// Adapter l'interface pour le mode standard
function updateInterfaceForStandardMode() {
    const conditionGroups = document.querySelectorAll('.condition-group');
    conditionGroups.forEach((group, index) => {
        const conditionHeader = group.querySelector('.condition-number');
        conditionHeader.textContent = `Condition ${index + 1}`;
        
        // Supprimer les champs spécifiques au mode proximité
        removeProximityFields(group);
    });
}

// Ajouter des champs spécifiques au mode proximité
function addProximityFields(conditionGroup, index) {
    const conditionFields = conditionGroup.querySelector('.condition-fields');
    const distanceGroup = conditionFields.querySelector('.field-group:last-child');
    
    if (index > 0) {
        // Pour les critères de proximité, ajouter distance min/max
        const existingProximityFields = conditionFields.querySelector('.proximity-fields');
        if (!existingProximityFields) {
            const proximityFieldsDiv = document.createElement('div');
            proximityFieldsDiv.className = 'proximity-fields';
            proximityFieldsDiv.innerHTML = `
                <div class="field-group">
                    <label>Distance minimale :</label>
                    <div class="distance-input">
                        <input type="number" class="min-distance" min="0" max="50000" value="0">
                        <span class="unit">mètres</span>
                    </div>
                </div>
                <div class="field-group">
                    <label>Distance maximale :</label>
                    <div class="distance-input">
                        <input type="number" class="max-distance" min="100" max="50000" value="1000">
                        <span class="unit">mètres</span>
                    </div>
                </div>
            `;
            
            // Insérer avant le champ distance existant
            conditionFields.insertBefore(proximityFieldsDiv, distanceGroup);
            
            // Masquer le champ distance standard
            distanceGroup.style.display = 'none';
        }
    }
}

// Supprimer les champs spécifiques au mode proximité
function removeProximityFields(conditionGroup) {
    const proximityFields = conditionGroup.querySelector('.proximity-fields');
    if (proximityFields) {
        proximityFields.remove();
    }
    
    // Réafficher le champ distance standard
    const distanceGroup = conditionGroup.querySelector('.field-group:last-child');
    if (distanceGroup) {
        distanceGroup.style.display = 'block';
    }
}

// Construire la requête Overpass pour le mode proximité croisée
function buildProximityQuery(conditions) {
    if (conditions.length === 0) return '';
    
    // Obtenir la zone géographique sélectionnée
    const geoArea = getSelectedGeographicArea();
    
    // Définir la zone de recherche
    let query = '[out:json][timeout:25];\n';
    query += `// Définir la zone de recherche : ${geoArea.name}\n`;
    
    // Si c'est une bounding box, pas besoin de définir une zone nommée
    if (boundingBox) {
        query += '\n';
    } else {
        query += '(\n';
        query += `  ${geoArea.query}\n`;
        query += ')->.searchArea;\n\n';
    }
    
    // Première condition = éléments à rechercher
    const targetCondition = conditions[0];
    const proximityConditions = conditions.slice(1);
    
    if (proximityConditions.length === 0) {
        // Si pas de critères de proximité, recherche standard dans la zone
        return buildStandardQueryInArea(targetCondition);
    }
    
    // Construire les ensembles de référence pour chaque critère de proximité
    proximityConditions.forEach((condition, index) => {
        query += `// Critère de proximité ${index + 1}: ${getConditionDescription(condition)}\n`;
        query += '(\n';
        query += buildConditionQuery(condition, 'searchArea');
        query += `)->.proximity${index + 1};\n\n`;
    });
    
    // Construire la requête principale avec intersections de proximité
    query += '// Recherche des éléments cibles avec critères de proximité\n';
    query += '(\n';
    
    // Construire la requête pour les éléments cibles
    const targetQuery = buildConditionQuery(targetCondition, 'searchArea');
    
    // Appliquer les filtres de proximité
    let proximityFilters = '';
    proximityConditions.forEach((condition, index) => {
        const minDist = condition.minDistance || 0;
        const maxDist = condition.maxDistance || condition.distance || 1000;
        
        if (minDist > 0) {
            // Approche avec distance min/max (plus complexe)
            proximityFilters += `(around.proximity${index + 1}:${maxDist})`;
        } else {
            // Distance maximale seulement
            proximityFilters += `(around.proximity${index + 1}:${maxDist})`;
        }
    });
    
    // Appliquer les filtres à chaque type d'élément
    const lines = targetQuery.split('\n').filter(line => line.trim());
    lines.forEach(line => {
        if (line.includes('node[') || line.includes('way[') || line.includes('relation[')) {
            const modifiedLine = line.replace('(area.searchArea);', `${proximityFilters}(area.searchArea);`);
            query += `  ${modifiedLine}\n`;
        }
    });
    
    // Gestion des distances minimales si spécifiées
    const hasMinDistances = proximityConditions.some(c => c.minDistance > 0);
    if (hasMinDistances) {
        query += ');\n\n';
        query += '// Exclure les éléments trop proches (distances minimales)\n';
        query += '(\n';
        query += '  ._;\n';
        
        proximityConditions.forEach((condition, index) => {
            const minDist = condition.minDistance;
            if (minDist > 0) {
                query += `  - node(around.proximity${index + 1}:${minDist});\n`;
                query += `  - way(around.proximity${index + 1}:${minDist});\n`;
            }
        });
        
        query += ');\n';
    } else {
        query += ');\n';
    }
    
    query += '\n// Sortir les résultats\nout geom;';
    
    return query;
}

// Construire une requête standard dans une zone
function buildStandardQueryInArea(condition) {
    let query = '[out:json][timeout:25];\n';
    query += '// Définir la zone de recherche : France\n';
    query += '(\n';
    query += '  area["ISO3166-1"="FR"][admin_level=2];\n';
    query += ')->.searchArea;\n\n';
    query += '(\n';
    query += buildConditionQuery(condition, 'searchArea');
    query += ');\nout geom;';
    
    return query;
}

// Construire la requête pour une condition spécifique
function buildConditionQuery(condition, areaVar) {
    const { category, types, nameMode, nameValue } = condition;
    let conditionQuery = '';
    
    // Construire le filtre par nom si spécifié
    let nameFilter = '';
    if (nameMode && nameValue && nameValue.trim()) {
        switch (nameMode) {
            case 'exact':
                nameFilter = `["name"="${nameValue}"]`;
                break;
            case 'contains':
                nameFilter = `["name"~".*${nameValue}.*",i]`;
                break;
            case 'starts':
                nameFilter = `["name"~"^${nameValue}",i]`;
                break;
        }
    }
    
    // Déterminer le filtre de zone
    let areaFilter = '';
    if (boundingBox) {
        const { south, west, north, east } = boundingBox;
        areaFilter = `(bbox:${south},${west},${north},${east})`;
    } else {
        areaFilter = `(area.${areaVar})`;
    }
    
    if (types && types.length > 0) {
        // Recherche avec types spécifiques sélectionnés
        types.forEach(type => {
            conditionQuery += `  node["${category}"="${type}"]${nameFilter}${areaFilter};\n`;
            conditionQuery += `  way["${category}"="${type}"]${nameFilter}${areaFilter};\n`;
            conditionQuery += `  relation["${category}"="${type}"]${nameFilter}${areaFilter};\n`;
        });
    } else {
        // Recherche par catégorie seulement
        conditionQuery += `  node["${category}"]${nameFilter}${areaFilter};\n`;
        conditionQuery += `  way["${category}"]${nameFilter}${areaFilter};\n`;
        conditionQuery += `  relation["${category}"]${nameFilter}${areaFilter};\n`;
    }
    
    return conditionQuery;
}

// Obtenir une description lisible d'une condition
function getConditionDescription(condition) {
    const { category, types, nameMode, nameValue } = condition;
    let description = config.categories[category]?.label || category;
    
    if (types && types.length > 0) {
        const typeLabels = types.map(type => config.categories[category]?.types[type] || type);
        description += ` (${typeLabels.join(', ')})`;
    }
    
    if (nameMode && nameValue) {
        switch (nameMode) {
            case 'exact':
                description += ` avec nom exact "${nameValue}"`;
                break;
            case 'contains':
                description += ` contenant "${nameValue}"`;
                break;
            case 'starts':
                description += ` commençant par "${nameValue}"`;
                break;
        }
    }
    
    return description;
}

// Collecter les conditions avec support du mode proximité
function collectConditionsWithProximity() {
    const conditions = [];
    const conditionGroups = document.querySelectorAll('.condition-group');
    const searchMode = 'proximity'; // Mode fixé à proximité
    
    conditionGroups.forEach((group, index) => {
        const condition = group.querySelector('.condition');
        const conditionId = condition.id.replace('condition', '');
        
        const category = condition.querySelector('.category').value;
        
        // Collecter les types sélectionnés
        const selectedTypes = [];
        const typeCheckboxes = condition.querySelectorAll('.types-container input[type="checkbox"]:checked');
        typeCheckboxes.forEach(checkbox => {
            selectedTypes.push(checkbox.value);
        });
        
        // Collecter les informations de recherche par nom
        const nameMode = condition.querySelector('.name-mode').value;
        const nameValue = condition.querySelector('.name').value;
        
        // Collecter les distances selon le mode
        let distance, minDistance, maxDistance;
        
        if (searchMode === 'proximity' && index > 0) {
            // Mode proximité : utiliser min/max
            const minDistInput = condition.querySelector('.min-distance');
            const maxDistInput = condition.querySelector('.max-distance');
            minDistance = minDistInput ? parseInt(minDistInput.value) || 0 : 0;
            maxDistance = maxDistInput ? parseInt(maxDistInput.value) || 1000 : 1000;
        } else {
            // Mode standard : utiliser distance simple
            const distanceInput = condition.querySelector('.distance');
            distance = distanceInput ? parseInt(distanceInput.value) || 1000 : 1000;
        }
        
        if (category) {
            conditions.push({
                id: conditionId,
                category,
                types: selectedTypes,
                nameMode,
                nameValue,
                distance,
                minDistance,
                maxDistance
            });
        }
    });
    
    return conditions;
}

// Peupler les zones géographiques
function populateGeographicZones() {
    const geoLevelSelect = document.getElementById('geoLevel');
    const geoZoneSelect = document.getElementById('geoZone');
    
    if (!geoLevelSelect || !geoZoneSelect) return;
    
    // Événement pour le changement de niveau géographique
    geoLevelSelect.addEventListener('change', function() {
        updateGeographicZones(this.value);
    });
    
    // Initialiser avec le pays (France) par défaut
    updateGeographicZones('country');
}

// Mettre à jour les zones géographiques selon le niveau sélectionné
function updateGeographicZones(level) {
    const geoZoneSelect = document.getElementById('geoZone');
    if (!geoZoneSelect) return;
    
    // Vider les options existantes
    geoZoneSelect.innerHTML = '<option value="">Sélectionner une zone</option>';
    
    if (!level || !config.geographicZones[level]) return;
    
    // Ajouter les zones du niveau sélectionné
    Object.keys(config.geographicZones[level]).forEach(zoneName => {
        const option = document.createElement('option');
        option.value = zoneName;
        option.textContent = zoneName;
        if (zoneName === 'France' && level === 'country') {
            option.selected = true; // Sélectionner France par défaut
        }
        geoZoneSelect.appendChild(option);
    });
    
    // Mettre à jour la carte si une zone est sélectionnée
    if (level === 'country' && geoZoneSelect.value === 'France') {
        updateMapView('France', level);
    }
}

// Mettre à jour la vue de la carte selon la zone sélectionnée
function updateMapView(zoneName, level) {
    if (!map || !config.geographicZones[level] || !config.geographicZones[level][zoneName]) return;
    
    const zoneData = config.geographicZones[level][zoneName];
    const lat = zoneData.lat;
    const lon = zoneData.lon;
    
    // Déterminer le niveau de zoom selon le type de zone
    let zoom;
    switch (level) {
        case 'continent':
            zoom = 3;
            break;
        case 'country':
            zoom = 6;
            break;
        case 'region':
            zoom = 8;
            break;
        case 'city':
            zoom = 12;
            break;
        default:
            zoom = 6;
    }
    
    map.setView([lat, lon], zoom);
}

// Obtenir la requête de zone géographique sélectionnée
function getSelectedGeographicArea() {
    const geoLevelSelect = document.getElementById('geoLevel');
    const geoZoneSelect = document.getElementById('geoZone');
    
    if (!geoLevelSelect || !geoZoneSelect) {
        // Valeur par défaut si les éléments n'existent pas
        return {
            query: 'area["ISO3166-1"="FR"][admin_level=2];',
            name: 'France'
        };
    }
    
    const level = geoLevelSelect.value;
    const zoneName = geoZoneSelect.value;
    
    if (!level || !zoneName || !config.geographicZones[level] || !config.geographicZones[level][zoneName]) {
        // Valeur par défaut
        return {
            query: 'area["ISO3166-1"="FR"][admin_level=2];',
            name: 'France'
        };
    }
    
    return {
        query: config.geographicZones[level][zoneName].query,
        name: zoneName
    };
}

// Initialiser les contrôles de bounding box
function initializeBboxControls() {
    const drawBboxBtn = document.getElementById('drawBbox');
    const clearBboxBtn = document.getElementById('clearBbox');
    
    if (!drawBboxBtn || !clearBboxBtn) return;
    
    // Événements pour les boutons
    drawBboxBtn.addEventListener('click', startBboxDrawing);
    clearBboxBtn.addEventListener('click', clearBoundingBox);
    
    // Événements de la carte pour le dessin
    map.on('mousedown', onMapMouseDown);
    map.on('mousemove', onMapMouseMove);
    map.on('mouseup', onMapMouseUp);
}

// Commencer le dessin de bounding box
function startBboxDrawing() {
    drawingMode = true;
    const drawBboxBtn = document.getElementById('drawBbox');
    const clearBboxBtn = document.getElementById('clearBbox');
    
    drawBboxBtn.textContent = 'Cliquez et glissez sur la carte';
    drawBboxBtn.disabled = true;
    
    // Changer le curseur de la carte
    map.getContainer().style.cursor = 'crosshair';
    
    // Effacer la bounding box existante si elle existe
    if (bboxRectangle) {
        map.removeLayer(bboxRectangle);
        bboxRectangle = null;
    }
}

// Variables pour le dessin
let isDrawing = false;
let startLatLng = null;

// Gérer le début du dessin (mousedown)
function onMapMouseDown(e) {
    if (!drawingMode) return;
    
    isDrawing = true;
    startLatLng = e.latlng;
    
    // Empêcher le déplacement de la carte pendant le dessin
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
}

// Gérer le mouvement de la souris (mousemove)
function onMapMouseMove(e) {
    if (!drawingMode || !isDrawing || !startLatLng) return;
    
    // Supprimer le rectangle temporaire s'il existe
    if (bboxRectangle) {
        map.removeLayer(bboxRectangle);
    }
    
    // Créer un nouveau rectangle temporaire
    const bounds = L.latLngBounds(startLatLng, e.latlng);
    bboxRectangle = L.rectangle(bounds, {
        color: '#ff7800',
        weight: 2,
        fillOpacity: 0.1
    }).addTo(map);
}

// Gérer la fin du dessin (mouseup)
function onMapMouseUp(e) {
    if (!drawingMode || !isDrawing || !startLatLng) return;
    
    isDrawing = false;
    drawingMode = false;
    
    // Réactiver les contrôles de la carte
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    
    // Restaurer le curseur
    map.getContainer().style.cursor = '';
    
    // Finaliser la bounding box
    const endLatLng = e.latlng;
    finalizeBoundingBox(startLatLng, endLatLng);
    
    startLatLng = null;
}

// Finaliser la bounding box
function finalizeBoundingBox(start, end) {
    // Calculer les coordonnées de la bounding box
    const south = Math.min(start.lat, end.lat);
    const north = Math.max(start.lat, end.lat);
    const west = Math.min(start.lng, end.lng);
    const east = Math.max(start.lng, end.lng);
    
    // Stocker la bounding box
    boundingBox = { south, west, north, east };
    
    // Mettre à jour l'interface
    updateBboxDisplay();
    
    // Réactiver le bouton de dessin
    const drawBboxBtn = document.getElementById('drawBbox');
    const clearBboxBtn = document.getElementById('clearBbox');
    
    drawBboxBtn.innerHTML = '<i class="fas fa-edit"></i> Redessiner la zone';
    drawBboxBtn.disabled = false;
    clearBboxBtn.style.display = 'inline-flex';
}

// Mettre à jour l'affichage de la bounding box
function updateBboxDisplay() {
    if (!boundingBox) return;
    
    const bboxDisplay = document.getElementById('bboxDisplay');
    const bboxCoords = document.getElementById('bboxCoords');
    
    if (bboxDisplay && bboxCoords) {
        const coordsText = `${boundingBox.south.toFixed(6)}, ${boundingBox.west.toFixed(6)}, ${boundingBox.north.toFixed(6)}, ${boundingBox.east.toFixed(6)}`;
        bboxCoords.value = coordsText;
        bboxDisplay.style.display = 'block';
    }
}

// Effacer la bounding box
function clearBoundingBox() {
    // Supprimer le rectangle de la carte
    if (bboxRectangle) {
        map.removeLayer(bboxRectangle);
        bboxRectangle = null;
    }
    
    // Réinitialiser les variables
    boundingBox = null;
    drawingMode = false;
    isDrawing = false;
    startLatLng = null;
    
    // Mettre à jour l'interface
    const drawBboxBtn = document.getElementById('drawBbox');
    const clearBboxBtn = document.getElementById('clearBbox');
    const bboxDisplay = document.getElementById('bboxDisplay');
    const bboxCoords = document.getElementById('bboxCoords');
    
    drawBboxBtn.innerHTML = '<i class="fas fa-draw-polygon"></i> Dessiner sur la carte';
    drawBboxBtn.disabled = false;
    clearBboxBtn.style.display = 'none';
    
    if (bboxDisplay) {
        bboxDisplay.style.display = 'none';
    }
    if (bboxCoords) {
        bboxCoords.value = '';
    }
    
    // Restaurer le curseur
    map.getContainer().style.cursor = '';
    
    // Réactiver les contrôles de la carte
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
}

// Obtenir la requête de zone géographique sélectionnée (modifiée pour bounding box)
function getSelectedGeographicArea() {
    // Si une bounding box est définie, l'utiliser
    if (boundingBox) {
        const { south, west, north, east } = boundingBox;
        return {
            query: `(bbox:${south},${west},${north},${east});`,
            name: `Zone personnalisée (${south.toFixed(3)}, ${west.toFixed(3)}, ${north.toFixed(3)}, ${east.toFixed(3)})`
        };
    }
    
    // Sinon, utiliser la France par défaut
    return {
        query: 'area["ISO3166-1"="FR"][admin_level=2];',
        name: 'France'
    };
}

// Peupler les catégories principales
function populateMainCategories() {
    const categorySelect = document.querySelector('.main-search .category');
    if (!categorySelect) return;
    
    // Vider les options existantes sauf la première
    categorySelect.innerHTML = '<option value="">Sélectionner une catégorie</option>';
    
    // Ajouter les catégories depuis la configuration
    Object.keys(config.categories).forEach(categoryKey => {
        const category = config.categories[categoryKey];
        const option = document.createElement('option');
        option.value = categoryKey;
        option.textContent = category.label;
        categorySelect.appendChild(option);
    });
}

// Ajouter un complément de recherche
function addComplement() {
    complementCount++;
    
    const complementsContainer = document.getElementById('complementsContainer');
    const newComplement = document.createElement('div');
    newComplement.className = 'complement-item';
    newComplement.id = `complement${complementCount}`;
    
    newComplement.innerHTML = `
        <div class="complement-header">
            <span class="complement-title">Complément ${complementCount}</span>
            <div class="complement-operator">
                <select class="operator" name="operator${complementCount}">
                    <option value="AND">ET</option>
                    <option value="OR">OU</option>
                </select>
            </div>
            <button type="button" class="remove-complement" onclick="removeComplement(${complementCount})">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="condition-fields">
            <div class="field-group">
                <label>Catégorie :</label>
                <select class="category" name="complementCategory${complementCount}" required>
                    <option value="">Sélectionner une catégorie</option>
                </select>
            </div>
            
            <div class="field-group">
                <label>Types (sélection multiple) :</label>
                <div class="types-container" name="complementTypes${complementCount}">
                    <p class="no-types">Sélectionnez d'abord une catégorie</p>
                </div>
            </div>
            
            <div class="field-group">
                <label>Recherche par nom (optionnel) :</label>
                <div class="name-search">
                    <select class="name-mode" name="complementNameMode${complementCount}">
                        <option value="">Ignorer le nom</option>
                        <option value="exact">Nom exact</option>
                        <option value="contains">Contient</option>
                        <option value="starts">Commence par</option>
                    </select>
                    <input type="text" class="name" name="complementName${complementCount}" placeholder="Texte à rechercher" disabled>
                </div>
            </div>
            
            <div class="field-group">
                <label>Distance :</label>
                <div class="distance-input">
                    <input type="number" class="distance" name="complementDistance${complementCount}" min="1" max="50000" value="100">
                    <span class="unit">mètres</span>
                </div>
            </div>
        </div>
    `;
    
    complementsContainer.appendChild(newComplement);
    
    // Peupler les catégories pour le nouveau complément
    const newCategorySelect = newComplement.querySelector('.category');
    populateCategorySelect(newCategorySelect);
    
    // Mettre à jour la visibilité des boutons de suppression
    updateComplementRemoveButtons();
}

// Supprimer un complément
function removeComplement(complementNumber) {
    const complement = document.getElementById(`complement${complementNumber}`);
    if (complement) {
        complement.remove();
        updateComplementRemoveButtons();
    }
}

// Mettre à jour la visibilité des boutons de suppression des compléments
function updateComplementRemoveButtons() {
    const complements = document.querySelectorAll('.complement-item');
    complements.forEach((complement, index) => {
        const removeBtn = complement.querySelector('.remove-complement');
        if (removeBtn) {
            removeBtn.style.display = complements.length > 1 ? 'flex' : 'none';
        }
    });
}

// Collecter la recherche principale et les compléments
function collectMainSearchAndComplements() {
    const result = {
        mainSearch: null,
        complements: []
    };
    
    // Collecter la recherche principale
    const mainSearch = document.querySelector('.main-search');
    if (mainSearch) {
        const category = mainSearch.querySelector('.category').value;
        
        if (category) {
            // Collecter les types sélectionnés
            const selectedTypes = [];
            const typeCheckboxes = mainSearch.querySelectorAll('.types-container input[type="checkbox"]:checked');
            typeCheckboxes.forEach(checkbox => {
                selectedTypes.push(checkbox.value);
            });
            
            // Collecter les informations de recherche par nom
            const nameMode = mainSearch.querySelector('.name-mode').value;
            const nameValue = mainSearch.querySelector('.name').value;
            
            result.mainSearch = {
                category,
                types: selectedTypes,
                nameMode,
                nameValue
            };
        }
    }
    
    // Collecter les compléments
    const complements = document.querySelectorAll('.complement-item');
    complements.forEach((complement, index) => {
        const category = complement.querySelector('.category').value;
        const operator = complement.querySelector('.operator').value;
        const distance = complement.querySelector('.distance').value;
        
        if (category) {
            // Collecter les types sélectionnés
            const selectedTypes = [];
            const typeCheckboxes = complement.querySelectorAll('.types-container input[type="checkbox"]:checked');
            typeCheckboxes.forEach(checkbox => {
                selectedTypes.push(checkbox.value);
            });
            
            // Collecter les informations de recherche par nom
            const nameMode = complement.querySelector('.name-mode').value;
            const nameValue = complement.querySelector('.name').value;
            
            result.complements.push({
                operator,
                category,
                types: selectedTypes,
                nameMode,
                nameValue,
                distance: parseInt(distance) || 100
            });
        }
    });
    
    return result;
}

// Construire la requête selon votre exemple
function buildNewStyleQuery() {
    const searchData = collectMainSearchAndComplements();
    
    if (!searchData.mainSearch) {
        throw new Error('Veuillez définir la recherche principale');
    }
    
    // Obtenir la bounding box
    if (!boundingBox) {
        throw new Error('Veuillez dessiner une zone de recherche sur la carte');
    }
    
    const { south, west, north, east } = boundingBox;
    
    // Construire la requête selon votre exemple
    let query = `[out:json][timeout:25][bbox:${south},${west},${north},${east}];\n`;
    
    if (searchData.complements.length > 0) {
        // 1. D'abord trouver les compléments dans la zone (éléments de référence)
        searchData.complements.forEach((complement, index) => {
            const complementName = getComplementVariableName(complement);
            query += `// ${index + 1}. Trouver les ${getConditionDescription(complement)} dans la zone\n`;
            query += '(\n';
            query += buildMainSearchQuery(complement);
            query += `)->.${complementName};\n\n`;
        });
        
        // 2. Chercher les éléments principaux dans la zone avec contraintes de proximité
        query += `// ${searchData.complements.length + 1}. Trouver les ${getConditionDescription(searchData.mainSearch)} dans la zone`;
        
        // Ajouter les contraintes de proximité dans le titre
        const proximityDescriptions = searchData.complements.map((comp, index) => 
            `à ${comp.distance}m des ${getConditionDescription(comp)}`
        );
        query += ` ${proximityDescriptions.join(' et ')}\n`;
        
        query += '(\n';
        
        // Construire la requête pour les éléments principaux avec toutes les contraintes de proximité
        const { category, types, nameMode, nameValue } = searchData.mainSearch;
        
        // Construire le filtre par nom si spécifié
        let nameFilter = '';
        if (nameMode && nameValue && nameValue.trim()) {
            switch (nameMode) {
                case 'exact':
                    nameFilter = `[name="${nameValue}"]`;
                    break;
                case 'contains':
                    nameFilter = `[name~"${nameValue}",i]`;
                    break;
                case 'starts':
                    nameFilter = `[name~"^${nameValue}",i]`;
                    break;
            }
        }
        
        // Construire les filtres de proximité pour tous les compléments
        let proximityFilters = '';
        searchData.complements.forEach((complement, index) => {
            const complementName = getComplementVariableName(complement);
            proximityFilters += `(around.${complementName}:${complement.distance})`;
        });
        
        // Appliquer à tous les types d'éléments
        if (types && types.length > 0) {
            // Recherche avec types spécifiques sélectionnés
            types.forEach(type => {
                query += `  nwr[${category}=${type}]${nameFilter}${proximityFilters};\n`;
            });
        } else {
            // Recherche par catégorie seulement
            query += `  nwr[${category}]${nameFilter}${proximityFilters};\n`;
        }
        
        query += `)->.main_results;\n\n`;
        
        // 3. Sortir tous les résultats avec des tags pour les identifier
        query += '// Sortir les résultats principaux\n';
        query += '.main_results out center;\n\n';
        
        // 4. Sortir les compléments avec des tags pour les identifier
        searchData.complements.forEach((complement, index) => {
            const complementName = getComplementVariableName(complement);
            query += `// Sortir les ${getConditionDescription(complement)}\n`;
            query += `.${complementName} out center;\n`;
            if (index < searchData.complements.length - 1) query += '\n';
        });
    } else {
        // Si pas de compléments, recherche simple des éléments principaux
        query += '// 1. Trouver les éléments principaux dans la zone\n';
        query += '(\n';
        query += buildMainSearchQuery(searchData.mainSearch);
        query += ');\nout center;';
    }
    
    return query;
}

// Construire la requête pour la recherche principale
function buildMainSearchQuery(mainSearch) {
    const { category, types, nameMode, nameValue } = mainSearch;
    let query = '';
    
    // Construire le filtre par nom si spécifié
    let nameFilter = '';
    if (nameMode && nameValue && nameValue.trim()) {
        switch (nameMode) {
            case 'exact':
                nameFilter = `[name="${nameValue}"]`;
                break;
            case 'contains':
                nameFilter = `[name~"${nameValue}",i]`;
                break;
            case 'starts':
                nameFilter = `[name~"^${nameValue}",i]`;
                break;
        }
    }
    
    if (types && types.length > 0) {
        // Recherche avec types spécifiques sélectionnés
        types.forEach(type => {
            query += `  nwr[${category}=${type}]${nameFilter};\n`;
        });
    } else {
        // Recherche par catégorie seulement
        query += `  nwr[${category}]${nameFilter};\n`;
    }
    
    return query;
}

// Construire la requête pour un complément
function buildComplementQuery(complement) {
    const { category, types, nameMode, nameValue, distance } = complement;
    let query = '';
    
    // Construire le filtre par nom si spécifié
    let nameFilter = '';
    if (nameMode && nameValue && nameValue.trim()) {
        switch (nameMode) {
            case 'exact':
                nameFilter = `[name="${nameValue}"]`;
                break;
            case 'contains':
                nameFilter = `[name~"${nameValue}",i]`;
                break;
            case 'starts':
                nameFilter = `[name~"^${nameValue}",i]`;
                break;
        }
    }
    
    if (types && types.length > 0) {
        // Recherche avec types spécifiques sélectionnés
        types.forEach(type => {
            query += `  nwr[${category}=${type}]${nameFilter}(around.main_elements:${distance});\n`;
        });
    } else {
        // Recherche par catégorie seulement
        query += `  nwr[${category}]${nameFilter}(around.main_elements:${distance});\n`;
    }
    
    return query;
}

// Obtenir le nom de variable pour un complément
function getComplementVariableName(complement) {
    const { category, types } = complement;
    
    // Créer un nom de variable basé sur la catégorie et le type
    if (types && types.length > 0) {
        const firstType = types[0];
        return `${firstType.replace(/[^a-zA-Z0-9]/g, '_')}s`;
    } else {
        return `${category.replace(/[^a-zA-Z0-9]/g, '_')}s`;
    }
}

// Construire la requête pour la recherche principale avec référence
function buildMainSearchQueryWithReference(mainSearch, referenceName, distance) {
    const { category, types, nameMode, nameValue } = mainSearch;
    let query = '';
    
    // Construire le filtre par nom si spécifié
    let nameFilter = '';
    if (nameMode && nameValue && nameValue.trim()) {
        switch (nameMode) {
            case 'exact':
                nameFilter = `[name="${nameValue}"]`;
                break;
            case 'contains':
                nameFilter = `[name~"${nameValue}",i]`;
                break;
            case 'starts':
                nameFilter = `[name~"^${nameValue}",i]`;
                break;
        }
    }
    
    if (types && types.length > 0) {
        // Recherche avec types spécifiques sélectionnés
        types.forEach(type => {
            query += `  nwr[${category}=${type}]${nameFilter}(around.${referenceName}:${distance});\n`;
        });
    } else {
        // Recherche par catégorie seulement
        query += `  nwr[${category}]${nameFilter}(around.${referenceName}:${distance});\n`;
    }
    
    return query;
}

// Construire la requête pour un complément avec référence
function buildComplementQueryWithReference(mainSearch, referenceName, distance) {
    const { category, types, nameMode, nameValue } = mainSearch;
    let query = '';
    
    // Construire le filtre par nom si spécifié
    let nameFilter = '';
    if (nameMode && nameValue && nameValue.trim()) {
        switch (nameMode) {
            case 'exact':
                nameFilter = `[name="${nameValue}"]`;
                break;
            case 'contains':
                nameFilter = `[name~"${nameValue}",i]`;
                break;
            case 'starts':
                nameFilter = `[name~"^${nameValue}",i]`;
                break;
        }
    }
    
    if (types && types.length > 0) {
        // Recherche avec types spécifiques sélectionnés
        types.forEach(type => {
            query += `  nwr[${category}=${type}]${nameFilter}(around.${referenceName}:${distance});\n`;
        });
    } else {
        // Recherche par catégorie seulement
        query += `  nwr[${category}]${nameFilter}(around.${referenceName}:${distance});\n`;
    }
    
    return query;
}

// Initialiser la recherche d'adresse
function initializeAddressSearch() {
    const addressInput = document.getElementById('addressInput');
    const searchAddressBtn = document.getElementById('searchAddressBtn');
    const addressSuggestions = document.getElementById('addressSuggestions');
    
    if (!addressInput || !searchAddressBtn || !addressSuggestions) return;
    
    let searchTimeout;
    
    // Recherche en temps réel pendant la saisie
    addressInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (query.length < 3) {
            addressSuggestions.style.display = 'none';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            searchAddresses(query);
        }, 300);
    });
    
    // Recherche au clic sur le bouton
    searchAddressBtn.addEventListener('click', function() {
        const query = addressInput.value.trim();
        if (query.length >= 3) {
            searchAddresses(query);
        }
    });
    
    // Recherche à l'appui sur Entrée
    addressInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query.length >= 3) {
                searchAddresses(query);
            }
        }
    });
    
    // Masquer les suggestions quand on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!addressInput.contains(e.target) && !addressSuggestions.contains(e.target)) {
            addressSuggestions.style.display = 'none';
        }
    });
}

// Rechercher des adresses avec l'API Nominatim
async function searchAddresses(query) {
    const addressSuggestions = document.getElementById('addressSuggestions');
    
    try {
        // Afficher un indicateur de chargement
        addressSuggestions.innerHTML = '<div class="address-suggestion">🔍 Recherche en cours...</div>';
        addressSuggestions.style.display = 'block';
        
        // Construire l'URL de l'API Nominatim
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`;
        
        const response = await fetch(nominatimUrl, {
            headers: {
                'User-Agent': 'OSINT-Recherche-Overpass/1.0'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const results = await response.json();
        
        // Afficher les résultats
        displayAddressSuggestions(results);
        
    } catch (error) {
        console.error('Erreur lors de la recherche d\'adresse:', error);
        addressSuggestions.innerHTML = '<div class="address-suggestion">❌ Erreur lors de la recherche</div>';
        addressSuggestions.style.display = 'block';
        
        setTimeout(() => {
            addressSuggestions.style.display = 'none';
        }, 3000);
    }
}

// Afficher les suggestions d'adresses
function displayAddressSuggestions(results) {
    const addressSuggestions = document.getElementById('addressSuggestions');
    
    if (!results || results.length === 0) {
        addressSuggestions.innerHTML = '<div class="address-suggestion">🚫 Aucune adresse trouvée</div>';
        addressSuggestions.style.display = 'block';
        
        setTimeout(() => {
            addressSuggestions.style.display = 'none';
        }, 3000);
        return;
    }
    
    // Construire la liste des suggestions
    let suggestionsHTML = '';
    
    results.forEach((result, index) => {
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        const displayName = result.display_name;
        const type = result.type || 'Lieu';
        
        // Extraire les informations principales
        const address = result.address || {};
        const name = address.house_number && address.road 
            ? `${address.house_number} ${address.road}`
            : address.road || address.village || address.town || address.city || result.name || 'Sans nom';
        
        const location = [address.city, address.town, address.village, address.county]
            .filter(Boolean)
            .join(', ') || address.country || '';
        
        suggestionsHTML += `
            <div class="address-suggestion" data-lat="${lat}" data-lon="${lon}" data-name="${displayName}">
                <div class="suggestion-name">${name}</div>
                <div class="suggestion-details">${location} • ${type}</div>
            </div>
        `;
    });
    
    addressSuggestions.innerHTML = suggestionsHTML;
    addressSuggestions.style.display = 'block';
    
    // Ajouter les événements de clic sur les suggestions
    const suggestionElements = addressSuggestions.querySelectorAll('.address-suggestion');
    suggestionElements.forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            const lat = parseFloat(this.dataset.lat);
            const lon = parseFloat(this.dataset.lon);
            const name = this.dataset.name;
            
            // Zoomer sur l'adresse sélectionnée
            zoomToAddress(lat, lon, name);
            
            // Masquer les suggestions
            addressSuggestions.style.display = 'none';
            
            // Mettre à jour le champ de recherche
            document.getElementById('addressInput').value = this.querySelector('.suggestion-name').textContent;
        });
    });
}

// Zoomer sur une adresse
function zoomToAddress(lat, lon, name) {
    if (!map) return;
    
    // Zoomer sur l'adresse
    map.setView([lat, lon], 16);
    
    // Ajouter un marqueur temporaire
    const addressMarker = L.marker([lat, lon], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map);
    
    // Popup avec les informations de l'adresse
    const popupContent = `
        <div>
            <h4>📍 Adresse recherchée</h4>
            <p><strong>${name}</strong></p>
            <p><strong>Coordonnées:</strong> ${lat.toFixed(6)}, ${lon.toFixed(6)}</p>
            <div style="margin-top: 10px;">
                <button onclick="removeAddressMarker()" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                    Supprimer ce marqueur
                </button>
            </div>
        </div>
    `;
    
    addressMarker.bindPopup(popupContent).openPopup();
    
    // Stocker la référence du marqueur pour pouvoir le supprimer
    window.currentAddressMarker = addressMarker;
    
    showSuccess(`Adresse trouvée : ${name}`);
}

// Supprimer le marqueur d'adresse
function removeAddressMarker() {
    if (window.currentAddressMarker) {
        map.removeLayer(window.currentAddressMarker);
        window.currentAddressMarker = null;
        showSuccess('Marqueur d\'adresse supprimé');
    }
}

// Fonctions utilitaires globales
window.removeCondition = removeCondition;
window.removeComplement = removeComplement;
window.removeAddressMarker = removeAddressMarker;
window.zoomToResult = zoomToResult;
