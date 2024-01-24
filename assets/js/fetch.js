import { singleWeather, singleWeatherInfos, singleWeatherAllDay, searchTown } from "./singleWeather.js"
import { fetchWeatherWeek } from "./weekWeather.js"

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














