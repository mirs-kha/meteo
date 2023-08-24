
const myRequest1 = new Request("http://api.openweathermap.org/data/2.5/forecast?q=rouen&appid=01ed09787471c3c54b3e051988071182&lang=fr&units=metric")
const myList1 = document.querySelector('#doubletest')
let count = 0;
const temperature = document.querySelector('.temperature')
const ico = document.querySelector('.ico')
const ressenti= document.querySelector('.ressenti')
const ville= document.querySelector('.ville')
console.log(ressenti)




fetch(myRequest1)
.then(reponse => reponse.json())
.then((data) => {
  const firstWeather = data.list[0]; // Accédez au premier objet

  if (firstWeather) {
    console.log(firstWeather)
    console.log(firstWeather.main.temp); // Accédez à la température
    console.log(firstWeather.weather[0].description);
    console.log(firstWeather.main.feels_like);
    console.log(firstWeather.dt_txt)

    temperature.innerHTML = parseInt(firstWeather.main.temp)
    ico.innerHTML = `<img src="https://openweathermap.org/img/wn/${firstWeather.weather[0].icon}@4x.png" />`
    ressenti.innerHTML = `<p>${firstWeather.dt_txt}</p>${parseInt(firstWeather.main.temp_min)}° /  ${parseInt(firstWeather.main.temp_max)}° ressenti  ${parseInt(firstWeather.main.feels_like)}°`
    ville.innerHTML = `<h2> ${data.city.name} </h2> ${firstWeather.weather[0].description}`

  } else {
    console.log("Aucune donnée météo trouvée.");
  }
})
.catch(console.error);



const myRequest2 = new Request("http://api.openweathermap.org/data/2.5/forecast?q=rouen&appid=01ed09787471c3c54b3e051988071182&lang=fr&units=metric")
fetch(myRequest2)
  .then(reponse => reponse.json())
  .then((data) => {
    const weatherList = data.list;

    for (const [index, weather] of weatherList.entries()) {
        if (index === 0) {
            continue; // Passe à l'itération suivante si l'index est 0
        }


        if (count >= 3) {
            break; 
        }

        console.log(weather.main);


        console.log(weather.weather);
        count++;
        const listItem = document.createElement("div");
       
        listItem.setAttribute("class", `test`);


        listItem.innerHTML = `
        <p>${weather.dt_txt}</p>
        <p>${weather.dt}</p>
        <p>${parseInt(weather.main.temp_min)}</p>

        <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png" />
        <p>${weather.weather[0].description}</p>
        `
        myList1.append(listItem)
    }
  })
  .catch(console.error);















