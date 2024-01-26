import { singleWeather, singleWeatherInfos, singleWeatherAllDay, searchTown } from "./components/weather/singleWeather.js"
import { fetchWeatherWeek } from "./components/weather/weekWeather.js"

if (document.querySelector('#in').value === '') {
    var villeActuelle = "havre"
}
else {
    var villeActuelle = document.querySelector('#in').value;
}

searchTown()
singleWeather(villeActuelle);
singleWeatherInfos(villeActuelle);
singleWeatherAllDay(villeActuelle);
fetchWeatherWeek(villeActuelle);














