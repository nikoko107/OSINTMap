# OSINTMap - Outil d'Investigation Géospatiale

Un outil web professionnel pour l'investigation géospatiale utilisant l'API Overpass d'OpenStreetMap. Conçu pour les analystes OSINT, enquêteurs et chercheurs nécessitant des recherches géographiques précises avec contraintes de proximité.

![image](https://github.com/user-attachments/assets/c888b8f1-96a7-4fa9-b19d-58717eaa417e)


## 🎯 Fonctionnalités Principales

### 🗺️ **Recherche Géospatiale Avancée**
- **Zone de recherche personnalisée** : Dessinez votre zone d'investigation directement sur la carte
- **Recherche principale** : Définissez les éléments que vous cherchez (écoles, hôpitaux, commerces, etc.)
- **Compléments de proximité** : Ajoutez jusqu'à 5 critères de proximité avec distances personnalisées
- **Filtres par nom** : Recherche exacte, contient, ou commence par

### 🎨 **Visualisation Interactive**
- **Marqueurs colorés** : Différenciation visuelle automatique des types d'éléments
  - 🔵 **Bleu** : Résultats principaux de votre recherche
  - 🟢 **Vert** : Premier complément (élément de référence)
  - 🟠 **Orange** : Deuxième complément
  - 🔴 **Rouge** : Troisième complément
  - 🟣 **Violet** : Quatrième complément
  - 🟡 **Jaune** : Cinquième complément

### 📍 **Recherche d'Adresse Intégrée**
- **Géocodage en temps réel** : Recherchez n'importe quelle adresse avec l'API Nominatim
- **Suggestions automatiques** : Propositions d'adresses pendant la saisie
- **Zoom automatique** : Navigation directe vers l'adresse sélectionnée
- **Marqueur temporaire** : Visualisation de l'adresse avec possibilité de suppression

### 📊 **Interface de Résultats Séparée**
- **Table des résultats principaux** : Liste des éléments trouvés correspondant à votre recherche
- **Table des compléments** : Liste séparée des éléments de référence utilisés pour les contraintes de proximité
- **Zoom interactif** : Clic sur une ligne pour zoomer sur la carte
- **Liens externes** : Accès direct à OpenStreetMap et Google Street View

### 📤 **Export et Partage**
- **Export JSON** : Rapport complet avec métadonnées et requête Overpass
- **Export CSV** : Données tabulaires pour analyse dans Excel/LibreOffice
- **Copie de requête** : Requête Overpass générée copiable pour utilisation externe

## 🚀 Guide d'Utilisation

### 1. **Définir la Zone de Recherche**

1. Cliquez sur **"Dessiner sur la carte"**
2. Cliquez et glissez sur la carte pour créer un rectangle de recherche
3. La zone apparaît en orange avec les coordonnées affichées
4. Utilisez **"Effacer la zone"** pour recommencer si nécessaire

### 2. **Configurer la Recherche Principale**

1. **Sélectionnez une catégorie** : Services, Transport, Bâtiments, etc.
2. **Choisissez les types** : Cochez les types spécifiques (ex: restaurant, école)
3. **Filtrage par nom** (optionnel) :
   - **Nom exact** : Recherche précise
   - **Contient** : Le nom contient le texte
   - **Commence par** : Le nom commence par le texte

### 3. **Ajouter des Compléments de Proximité**

1. Cliquez sur **"Ajouter un complément"**
2. Configurez chaque complément :
   - **Catégorie et types** : Comme pour la recherche principale
   - **Distance** : Rayon de proximité en mètres
   - **Nom** : Filtrage optionnel par nom
3. Répétez pour jusqu'à 5 compléments

### 4. **Lancer la Recherche**

1. Cliquez sur **"Rechercher"**
2. Attendez le chargement (indicateur de progression)
3. Les résultats apparaissent sur la carte avec des couleurs distinctes

### 5. **Analyser les Résultats**

#### **Sur la Carte :**
- **Marqueurs colorés** : Chaque type d'élément a sa couleur
- **Popups informatifs** : Clic sur un marqueur pour voir les détails
- **Clic droit** : Accès direct à OpenStreetMap

#### **Dans les Listes :**
- **🎯 Résultats de la recherche** : Vos éléments cibles
- **📍 Éléments de référence** : Les compléments utilisés pour les contraintes
- **Zoom interactif** : Clic sur une ligne pour zoomer sur la carte
- **Sélection visuelle** : Ligne sélectionnée mise en évidence

### 6. **Navigation et Outils**

#### **Recherche d'Adresse :**
1. Tapez une adresse dans le champ de recherche
2. Sélectionnez une suggestion
3. La carte zoome automatiquement sur l'adresse
4. Un marqueur rouge temporaire est ajouté

#### **Export des Données :**
- **JSON** : Rapport complet avec métadonnées
- **CSV** : Données pour tableur
- **Requête** : Code Overpass pour réutilisation

## 📋 Exemples d'Utilisation

### **Exemple 1 : Écoles près de transports**
```
Zone : Dessiner autour d'une ville
Recherche principale : Catégorie "Services" → Type "École"
Complément 1 : Catégorie "Transport" → Type "Arrêt de bus" → Distance 300m
Résultat : Toutes les écoles à moins de 300m d'un arrêt de bus
```

### **Exemple 2 : Restaurants avec parking et banque**
```
Zone : Centre-ville
Recherche principale : Catégorie "Services" → Type "Restaurant"
Complément 1 : Catégorie "Services" → Type "Parking" → Distance 200m
Complément 2 : Catégorie "Services" → Type "Banque" → Distance 500m
Résultat : Restaurants avec parking à 200m ET banque à 500m
```

### **Exemple 3 : Recherche par nom spécifique**
```
Zone : Région
Recherche principale : Catégorie "Services" → Type "École" → Nom contient "Ferdinand"
Complément 1 : Catégorie "Services" → Type "Bureau de poste" → Distance 1000m
Résultat : Écoles contenant "Ferdinand" avec bureau de poste à 1km
```

## 🎨 Interface Utilisateur

### **Panneau de Recherche (Gauche)**
- Configuration de la zone de recherche
- Paramètres de recherche principale
- Gestion des compléments de proximité
- Affichage de la requête Overpass générée

### **Panneau de Résultats (Droite)**
- Carte interactive avec marqueurs colorés
- Recherche d'adresse intégrée
- Compteur de résultats avec répartition par type
- Listes séparées des résultats et compléments
- Boutons d'export

## 🔧 Fonctionnalités Techniques

### **Requêtes Overpass Optimisées**
- Génération automatique de requêtes complexes
- Support des contraintes de proximité multiples
- Gestion des bounding box personnalisées
- Filtrage par nom avec expressions régulières

### **Visualisation Avancée**
- Marqueurs Leaflet avec icônes colorées
- Popups informatifs avec liens externes
- Zoom automatique sur les résultats
- Synchronisation carte-liste bidirectionnelle

### **Performance et Fiabilité**
- Serveurs Overpass multiples avec basculement automatique
- Gestion d'erreurs robuste
- Interface responsive pour tous écrans
- Timeout configurable pour les requêtes

## 📊 Types de Données Supportés

### **Catégories Principales :**
- **Services et équipements** : Restaurants, banques, hôpitaux, écoles, etc.
- **Transport** : Routes, arrêts, gares, ponts, etc.
- **Bâtiments** : Résidentiel, commercial, industriel, public, etc.
- **Éléments naturels** : Eau, forêts, parcs, plages, etc.
- **Commerces** : Supermarchés, boutiques, pharmacies, etc.
- **Tourisme** : Hôtels, attractions, musées, etc.
- **Sites historiques** : Monuments, châteaux, ruines, etc.
- **Militaire** : Bases, bunkers, zones d'entraînement, etc.
- **Urgences** : Pompiers, ambulances, défibrillateurs, etc.
- **Transport ferroviaire** : Gares, métro, tramway, etc.

### **Filtres Disponibles :**
- **Par catégorie** : Recherche large par type d'élément
- **Par type spécifique** : Sélection multiple de sous-types
- **Par nom** : Filtrage textuel avec modes exact/contient/commence
- **Par proximité** : Contraintes de distance avec éléments de référence

## 🛠️ Installation et Configuration

### **Prérequis**
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Connexion Internet pour les API externes

### **Utilisation**
1. Ouvrez `index.html` dans votre navigateur
2. L'application se charge automatiquement
3. Aucune installation ou configuration supplémentaire requise

### **APIs Utilisées**
- **Overpass API** : Données OpenStreetMap
- **Nominatim** : Géocodage d'adresses
- **Leaflet** : Cartographie interactive

## 🔍 Cas d'Usage OSINT

### **Investigation Urbaine**
- Localiser des établissements avec contraintes spécifiques
- Analyser la densité de services dans une zone
- Identifier des patterns géographiques suspects

### **Recherche de Personnes**
- Trouver des lieux fréquentés avec critères multiples
- Analyser l'environnement autour d'adresses connues
- Identifier des points d'intérêt dans un périmètre

### **Analyse de Sécurité**
- Évaluer l'accessibilité aux services d'urgence
- Identifier les infrastructures critiques
- Analyser les voies d'accès et de fuite

### **Recherche Académique**
- Études de géographie urbaine
- Analyse de l'accessibilité aux services
- Recherche en aménagement du territoire

## 📝 Notes Techniques

### **Limitations**
- Dépendant de la qualité des données OpenStreetMap
- Timeout de 25 secondes pour les requêtes complexes
- Limitation à 5 compléments de proximité simultanés

### **Optimisations**
- Requêtes optimisées pour réduire la charge serveur
- Cache des résultats pour éviter les requêtes répétées
- Interface responsive pour tous types d'écrans

### **Sécurité**
- Aucune donnée personnelle stockée
- Requêtes anonymes vers les APIs publiques
- Code source ouvert et auditable

## 🆘 Support et Dépannage

### **Problèmes Courants**
- **Pas de résultats** : Vérifiez la zone de recherche et les critères
- **Erreur de serveur** : L'outil bascule automatiquement vers un autre serveur
- **Carte ne se charge pas** : Vérifiez votre connexion Internet

### **Conseils d'Utilisation**
- Commencez par des zones de recherche petites
- Utilisez des distances de proximité raisonnables (< 5km)
- Testez d'abord sans filtres par nom pour valider la zone

---

**Développé pour la communauté OSINT** - Outil libre et open source pour l'investigation géospatiale professionnelle.
