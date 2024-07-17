// Annonce de mes variables.------------------------------------------

// Variable responsable de l'event listener pour le bouton submit.
const formulaire = document.getElementById('formulaire');
// Variable responsable de l'event listener sur l'input.
const city = document.getElementById('city');
// Variable responsable de l'affichage de la réponse.
const display = document.getElementById('weatherDisplay');
// Variable pour afficher les villes favorites.
const favoriteCities = document.getElementById('favoriteCities');
// Section des favoris.
const favoritesSection = document.getElementById('favorites');
// Conteneur des prévisions.
const forecastContainer = document.getElementById('forecast-container');
// Div pour afficher les prévisions.
const forecast = document.getElementById('forecast');

// Charger les favoris depuis le stockage local.
const loadFavorites = () => {
    // Récupérer les favoris stockés dans le localStorage.
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Si des favoris existent, afficher la section des favoris.
    if (favorites.length > 0) {
        favoritesSection.style.display = 'block';
    }
    // Pour chaque ville favorite, ajouter à la liste des favoris.
    favorites.forEach(city => addFavorite(city));
};

// Enregistrer les favoris dans le stockage local.
const saveFavorites = (favorites) => {
    // Convertir les favoris en JSON et les enregistrer dans le localStorage.
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Ajouter une ville à la liste des favoris.
const addFavorite = (city) => {
    // Créer un élément de liste pour la ville.
    const li = document.createElement('li');
    li.textContent = city;
    // Créer un bouton pour supprimer la ville des favoris.
    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    // Ajouter un event listener pour le bouton de suppression.
    removeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Empêcher l'event de propagation.
        removeFavorite(city); // Appeler la fonction pour supprimer la ville.
    });
    li.appendChild(removeButton); // Ajouter le bouton à l'élément de liste.
    // Ajouter un event listener pour afficher la météo de la ville.
    li.addEventListener('click', () => getTheWeather(city));
    favoriteCities.appendChild(li); // Ajouter l'élément de liste aux favoris.
};

// Supprimer une ville de la liste des favoris.
const removeFavorite = (city) => {
    // Récupérer les favoris stockés dans le localStorage.
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Filtrer pour enlever la ville des favoris.
    favorites = favorites.filter(fav => fav !== city);
    saveFavorites(favorites); // Enregistrer les favoris mis à jour.
    favoriteCities.innerHTML = ''; // Vider la liste des favoris affichée.
    loadFavorites(); // Recharger les favoris.
    // Cacher la section des favoris si aucun favori.
    if (favorites.length === 0) {
        favoritesSection.style.display = 'none';
    }
};

// Event listener du bouton submit qui gère les erreurs de mauvaises entrées de villes, et qui appelle la fonction connectée à l'API.
formulaire.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche que la page s'actualise à chaque fois que l'on appuie sur le bouton submit.
    const choixUtilisateur = city.value.trim(); // Donner à la variable choixUtilisateur la valeur de l'input de type texte et enlever les espaces.
    if (choixUtilisateur) { // Si choixUtilisateur n'est pas vide alors appeler la fonction ou retourner une erreur.
        await getTheWeather(choixUtilisateur);
    } else {
        alert("Veuillez rentrer une ville valide");
    }
});

// Fonction responsable de la récupération des données auprès de l'API.
async function getTheWeather(choixUtilisateur) {
    const apiKey = "f34d30a8af76633e6650759bd1910506"; // Ma clé
    // URL de l'API avec la clé et les paramètres nécessaires.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${choixUtilisateur}&units=metric&lang=fr&appid=${apiKey}`;

    try { // Gérer les potentiels bugs et en même temps appeler l'API.
        console.log(`Requête URL: ${url}`); // Vérifier l'URL de la requête.
        const response = await fetch(url); // Attribuer à la variable response la réponse renvoyée par fetch(url).
        console.log(`Réponse brute: ${response}`); // Vérifier la réponse brute.
        const data = await response.json(); // Changer la réponse brute en format JSON.
        console.log('Données JSON:', data); // Vérifier les données JSON reçues.
        if (data.cod === 200) {
            await displayWeather(data); // Appeler la fonction pour gérer l'affichage.
            await getForecast(data.coord.lat, data.coord.lon); // Récupérer les prévisions météo.
        } else {
            display.innerHTML = `<p>Ville non trouvée. Veuillez réessayer.</p>`;
        }
    } catch (error) { // Gérer les erreurs si quelque chose ne va pas dans le try.
        console.error('Erreur:', error);
        display.innerHTML = `<p>Erreur lors de la récupération des données météorologiques.</p>`;
    }
}

// Fonction pour récupérer les prévisions météo.
async function getForecast(lat, lon) {
    const apiKey = "f34d30a8af76633e6650759bd1910506"; // Ma clé
    // URL de l'API pour les prévisions avec les paramètres nécessaires.
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`;

    try { // Appeler l'API et gérer les erreurs potentielles.
        const response = await fetch(url); // Récupérer la réponse de l'API.
        const data = await response.json(); // Convertir la réponse en JSON.
        console.log('Prévisions:', data); // Vérifier les données JSON des prévisions.
        if (data.cod === '200') {
            displayForecast(data); // Appeler la fonction pour afficher les prévisions.
        } else {
            console.error('Erreur lors de la récupération des prévisions météo.');
        }
    } catch (error) { // Gérer les erreurs lors de l'appel de l'API.
        console.error('Erreur:', error);
    }
}

// Fonction responsable de l'affichage des données météo.
function displayWeather(data) {
    // Concatenation des données récupérées pour les intégrer au HTML.
    const iconCode = data.weather[0].icon; // Code de l'icône météo.
    const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${data.weather[0].description} icon">
        <p id="temperature">${data.main.temp} °C</p>
        <p id="weather-description">${data.weather[0].description}</p>
        <div class="details">
            <div>
                <p><strong>Humidité :</strong> ${data.main.humidity} %</p>
            </div>
            <div>
                <p><strong>Vent :</strong> ${data.wind.speed} m/s</p>
            </div>
        </div>
        <button onclick="addCurrentCityToFavorites('${data.name}')">Ajouter aux favoris</button>
    `;
    display.innerHTML = weatherHTML; // Intégrer le HTML dans l'élément d'affichage.
}

// Fonction pour afficher les prévisions météo.
function displayForecast(data) {
    forecast.innerHTML = ''; // Vider l'élément de prévisions.
    // Pour chaque élément de prévision, si l'index est un multiple de 8 (24 heures).
    data.list.forEach((forecastItem, index) => {
        if (index % 8 === 0) { 
            const date = new Date(forecastItem.dt * 1000); // Convertir la date en format compréhensible.
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            const forecastDate = date.toLocaleDateString('fr-FR', options); // Formater la date.
            const iconCode = forecastItem.weather[0].icon; // Code de l'icône météo.
            const forecastHTML = `
                <div class="forecast-day">
                    <p><strong>${forecastDate}</strong></p>
                    <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="${forecastItem.weather[0].description} icon">
                    <p>${forecastItem.main.temp} °C</p>
                    <p>${forecastItem.weather[0].description}</p>
                </div>
            `;
            forecast.innerHTML += forecastHTML; // Ajouter les prévisions au HTML.
        }
    });
    forecastContainer.style.display = 'block'; // Afficher le conteneur des prévisions.
}

// Ajouter la ville actuelle aux favoris.
function addCurrentCityToFavorites(city) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Récupérer les favoris du localStorage.
    if (!favorites.includes(city)) { // Ajouter si la ville n'est pas déjà dans les favoris.
        favorites.push(city); 
        saveFavorites(favorites); // Enregistrer les favoris mis à jour.
        addFavorite(city); // Ajouter la ville à l'affichage des favoris.
        favoritesSection.style.display = 'block'; // Afficher la section des favoris.
    }
}

// Charger les favoris au démarrage.
loadFavorites();
