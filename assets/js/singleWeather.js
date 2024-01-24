import { fetchWeatherWeek } from "./weekWeather.js"
const ico = document.querySelector('.ico')
const ville = document.querySelector('.ville')
const temperature = document.querySelector('.temperature')
const humidite = document.querySelector('#humidite')
const vent = document.querySelector('#vent')
const ressenti = document.querySelector('#ressenti')
const ephemeride = document.querySelector('#ephemeride')
const journee = document.querySelector('.journee')

export async function singleWeather(villeActuelle) {
    try {
        const reponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${villeActuelle}&appid=ea54d3f7f009441e82ecb645fb071f6c&lang=fr&units=metric&cnt=1`);
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }
        const data = await reponse.json();
        const lister = data.list

        ico.innerHTML = `<img src="https://openweathermap.org/img/wn/${lister[0].weather[0].icon}@4x.png" />`
        ville.innerHTML = `<h2>Ville actuelle:</h2><h3>${data.city.name}</h3>`
        temperature.innerHTML = `<h2>${lister[0].main.temp}°C</h2>`

    } catch (error) {
        console.error(`error: ${error}`);
    }
}

export async function singleWeatherInfos(villeActuelle) {
    try {
        const reponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${villeActuelle}&appid=ea54d3f7f009441e82ecb645fb071f6c&lang=fr&units=metric&cnt=1`);
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }
        const data = await reponse.json();
        const lister = data.list
        const heureLever = new Date(data.city.sunrise * 1000).toLocaleTimeString('fr-FR', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
        const heureCouche = new Date(data.city.sunset * 1000).toLocaleTimeString('fr-FR', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });

        lister[0].wind.speed = lister[0].wind.speed * 3.6
        humidite.innerHTML = `<h3>Humidité :</h3><p>${lister[0].main.humidity}%</p>`
        vent.innerHTML = `<h3>Vent :</h3><p>${parseInt(lister[0].wind.speed)}km/h</p>`
        ressenti.innerHTML = `<h3>Ressenti :</h3><p>${lister[0].main.feels_like}°C</p>`
        ephemeride.innerHTML = `<h3>Ephéméride :</h3><p><img src="assets/img/arrow.png" class="arrowup" /> ${heureLever}   <img src="assets/img/arrow.png" class="arrowdown" /> ${heureCouche}</p>`

    } catch (error) {
        console.error(`error: ${error}`);
    }
}

export async function singleWeatherAllDay(villeActuelle) {
    try {
        const reponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${villeActuelle}&appid=ea54d3f7f009441e82ecb645fb071f6c&lang=fr&units=metric&cnt=9`);
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }
        const data = await reponse.json();
        const weatherList = data.list;
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


export async function searchTown() {
    const valid = document.querySelector('#valid');
    let villeActuelle
    valid.addEventListener("click", async function () {
        // Notez que vous devez réaffecter la valeur renvoyée à la variable villeActuelle
        villeActuelle = await recupererForm();
        console.log(villeActuelle);
        // Vous pouvez appeler les fonctions qui dépendent de villeActuelle ici
        singleWeather(villeActuelle);
        singleWeatherInfos(villeActuelle);
        singleWeatherAllDay(villeActuelle);
        fetchWeatherWeek(villeActuelle);
    });

    async function recupererForm() {
        const getTown = document.querySelector('#in').value;
        console.log(getTown);
        // Renvoie la nouvelle valeur de villeActuelle
        return getTown;
    }
}


