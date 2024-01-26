export async function fetchWeatherWeek(villeActuelle) {
    try {
        const reponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${villeActuelle}&appid=ea54d3f7f009441e82ecb645fb071f6c&lang=fr&units=metric`);
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
            minMaxArray.push(`<div class="days"><div class="day">${nomJour}</div> <div class="dayTemp"><img src="assets/img/arrow.png" class="arrowdown" />  ${parseInt(tempParJour[jour].minTemperature)}°C, <img src="assets/img/arrow.png" class="arrowup" />  ${parseInt(tempParJour[jour].maxTemperature)}°C</div></div>`)
            minmaxContainer.innerHTML = minMaxArray.join('');
        }

        function obtenirNomJour(numeroJour) {
            const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
            return joursSemaine[numeroJour];
        }

    } catch (error) {
        console.error(`error: ${error}`);
    }
}
