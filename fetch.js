import { searchTown } from './searchTown.js';
const ico = document.querySelector('.ico')
const ville = document.querySelector('.ville')
const humidite = document.querySelector('#humidite')
const vent = document.querySelector('#vent')
const ressenti = document.querySelector('#ressenti')
const ephemeride = document.querySelector('#ephemeride')
const temperature = document.querySelector('.temperature')

const journee = document.querySelector('.journee')


const valid = document.querySelector('#valid');

if (document.querySelector('#in').value === '') {
    var villeActuelle = "havre"


}
else {
    var villeActuelle = document.querySelector('#in').value;
}


searchTown()
async function singleWeather(villeActuelle) {
    try {
        const reponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${villeActuelle},fr&appid=ea54d3f7f009441e82ecb645fb071f6c&lang=fr&units=metric&cnt=1`);
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }
        const data = await reponse.json();
        const lister = data.list

        ico.innerHTML = `<img src="https://openweathermap.org/img/wn/${lister[0].weather[0].icon}@4x.png" />`
        ville.innerHTML = `<h2>Ville actuelle:</h2><h3>${data.city.name}</h3>`
        temperature.innerHTML = `<h2>${lister[0].main.temp}°C</h2>`



        console.log(data.city.sunrise);
        console.log(data.city.sunset);
        console.log(lister[0].main.temp);
        console.log(lister[0].weather[0].description);


    } catch (error) {
        console.error(`error: ${error}`);
    }
}
singleWeather(`${villeActuelle}`);



async function singleWeatherInfos(villeActuelle) {
    try {
        const reponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${villeActuelle},fr&appid=ea54d3f7f009441e82ecb645fb071f6c&lang=fr&units=metric&cnt=1`);
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }
        const data = await reponse.json();
        const lister = data.list

        lister[0].wind.speed = lister[0].wind.speed * 3.6
        humidite.innerHTML = `<h3>Humidité :</h3><p>${lister[0].main.humidity}%</p>`
        vent.innerHTML = `<h3>Vent :</h3><p>${parseInt(lister[0].wind.speed)}km/h</p>`
        ressenti.innerHTML = `<h3>Ressenti :</h3><p>${lister[0].main.feels_like}°C</p>`



        const heureLever = new Date(data.city.sunrise * 1000).toLocaleTimeString('fr-FR', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
        const heureCouche = new Date(data.city.sunset * 1000).toLocaleTimeString('fr-FR', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });

        ephemeride.innerHTML = `<h3>Ephéméride :</h3><p>Up: ${heureLever}   Down: ${heureCouche}</p>`


        console.log(data.city.sunrise);
        console.log(data.city.sunset);
        console.log(lister[0].main.temp);
        console.log(lister[0].weather[0].description);


    } catch (error) {
        console.error(`error: ${error}`);
    }
}
singleWeatherInfos(`${villeActuelle}`);




async function singleWeatherAllDay(villeActuelle) {
    try {
        const reponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${villeActuelle},fr&appid=ea54d3f7f009441e82ecb645fb071f6c&lang=fr&units=metric&cnt=9`);
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }
        const data = await reponse.json();
        const weatherList = data.list;
        console.log(data.list)

        const temperaturesArray = [];

        for (const [index, weather] of weatherList.entries()) {
            if (index === 0) {
                continue; // Passe à l'itération suivante si l'index est 0
            }

            let heures = new Date(weather.dt_txt).getHours();
            let minutes = new Date(weather.dt_txt).getMinutes();

            temperaturesArray.push(
                `<div class="temperatures"><h3>${heures}h${minutes}</h3>
                <img src="https://openweathermap.org/img/wn/${weatherList[index].weather[0].icon}@2x.png" /><br />
                ${parseInt(weather.main.temp)}°C</div>`
            );
        }

        journee.innerHTML = temperaturesArray.join(''); // Utiliser join pour convertir le tableau en chaîne

    } catch (error) {
        console.error(`error: ${error}`);
    }
}
singleWeatherAllDay(`${villeActuelle}`);



























async function fetchWeatherMinMax(villeActuelle) {
    try {
        const reponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${villeActuelle},fr&appid=ea54d3f7f009441e82ecb645fb071f6c&lang=fr&units=metric`);
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }
        const data = await reponse.json();
        const weatherList = data.list;

        // Fonction pour regrouper les températures par jour avec max et min
        function regrouperParJour(data) {
            const tempParJour = {};

            // Parcourir les entrées du tableau "list"
            data.forEach(entry => {
                // Convertir le timestamp en format jour (ignorant l'heure)
                const date = new Date(entry.dt * 1000); // Multiplier par 1000 pour convertir en millisecondes
                const jour = date.toISOString().split('T')[0];

                // Ajouter la température à l'objet tempParJour
                if (!tempParJour[jour]) {
                    tempParJour[jour] = {
                        temp: [],
                    };
                }

                tempParJour[jour].temp.push(entry.main.temp);
            });

            // Trouver le maximum et le minimum par jour
            for (const jour in tempParJour) {
                const tempArray = tempParJour[jour].temp;
                const maxTemperature = Math.max(...tempArray);
                const minTemperature = Math.min(...tempArray);

                tempParJour[jour].maxTemperature = maxTemperature;
                tempParJour[jour].minTemperature = minTemperature;
            }

            return tempParJour;
        }

        // Appeler la fonction avec les données de l'API
        const tempParJour = regrouperParJour(weatherList);
        // Afficher la maxTemperature du premier jour (par exemple)

        // Sélectionner l'élément existant avec l'ID "minmaxaafficher"
        const minmaxContainer = document.querySelector("#minmaxaafficher");

        const minMaxArray = []

        // Afficher les températures pour chaque jour dans cet élément
        for (let i = 0; i < 5; i++) {
            const jour = Object.keys(tempParJour)[i];

            // Convertir la date au format "2024-01-22" en objet Date
            const date = new Date(jour);

            // Obtenir le nom du jour
            const nomJour = obtenirNomJour(date.getDay());
            minMaxArray.push(`<div>${nomJour}: Min ${parseInt(tempParJour[jour].minTemperature)}°C, Max ${parseInt(tempParJour[jour].maxTemperature)}°C</div>`)
            minmaxContainer.innerHTML = minMaxArray.join('');
        }


    } catch (error) {
        console.error(`error: ${error}`);
    }
}


fetchWeatherMinMax(`${villeActuelle}`);


function obtenirNomJour(numeroJour) {
    const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    return joursSemaine[numeroJour];
}









