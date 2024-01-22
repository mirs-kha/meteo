export async function searchTown() {
    valid.addEventListener("click", async function () {
        // Notez que vous devez réaffecter la valeur renvoyée à la variable villeActuelle
        villeActuelle = await recupererForm();
        console.log(villeActuelle);
        // Vous pouvez appeler les fonctions qui dépendent de villeActuelle ici
        singleWeather(villeActuelle);
        singleWeatherInfos(villeActuelle);
        singleWeatherAllDay(villeActuelle);
        fetchWeatherMinMax(villeActuelle);
    });

    async function recupererForm() {
        const getTown = document.querySelector('#in').value;
        console.log(getTown);
        // Renvoie la nouvelle valeur de villeActuelle
        return getTown;
    }
}