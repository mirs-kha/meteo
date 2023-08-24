
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



  
  var input = document.getElementById("input");
  var inputArr = [];
  var addBtn = document.getElementById("add-btn");
  var display = document.getElementById("optionslist");
  var count2 = 0; // Un compteur pour générer les clés des cookies
  pCOOKIES = document.cookie.split("; "); // Sépare les cookies en un tableau

  var numberOfCookies = 0; // Déclaration en dehors de toutes les fonctions
  const output = document.getElementById("cookie-list"); // afficher la liste de cookies

  function deleteAllCookies() {
      // fx pour supp les cookies
      var allCookies = document.cookie.split(";");

      // The "expire" attribute of every cookie is
      // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
      for (var i = 0; i < allCookies.length; i++)
          document.cookie =
              allCookies[i] + "=;expires=" + new Date(0).toUTCString();

      output.innerHTML = document.cookie;
  }

  function deleteCookie(key) {
      document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Supprime le cookie en définissant une date d'expiration passée
  }

  displayCookies(); // appel de la fx displayCookies pour afficher les cookies existants

  // Fonction pour afficher les cookies existants
  function displayCookies() {
      var cookieValues = []; // Un tableau pour stocker les valeurs des cookies

      // Boucle à travers les cookies existants pour extraire leurs valeurs
      for (let i = 0; i < pCOOKIES.length; i++) {
          const cookiePair = pCOOKIES[i].split("="); // Divise la paire clé-valeur
          if (cookiePair.length === 2) {
              cookieValues.push(cookiePair[1]); // Ajoute la valeur du cookie au tableau
          }
      }

      const output = document.getElementById("villes"); // afficher la liste de cookies

      // Parcours les valeurs des cookies et les affiche sous forme d'éléments de liste
      cookieValues.forEach(function (cookieValue) {
          const listItem = document.createElement("li"); // Crée un élément de liste (li)
          listItem.textContent = cookieValue; // Définit le texte de l'élément de liste comme la valeur du cookie

          listItem.addEventListener("click", function () {
              // Ajoutez un gestionnaire d'événements pour gérer le clic sur l'élément de la liste
              alert(`La valeur du cookie est : ${cookieValue}`);
          });
          output.appendChild(listItem); // Ajoute chaque valeur comme un élément de liste
      });
      numberOfCookies = cookieValues.length; // Met à jour le nombre de cookies
      console.log(`Il y a ${numberOfCookies} cookies.`);
  }

  addBtn.addEventListener("click", addAnddisplay); // Ajoute un écouteur d'événements au bouton "Ajouter"

  function addAnddisplay() {
      inputArr.push(input.value); // Ajoute la valeur de l'input dans le tableau inputArr
      const userFav = document.createElement("div"); // Crée un élément div
      userFav.setAttribute("id", `${numberOfCookies + 1}`); // Définit l'attribut ID de l'élément div avec la valeur du compteur
      userFav.innerHTML = input.value; // Définit le contenu de l'élément div comme la valeur de l'input
      document.cookie = `${numberOfCookies + 1}=${input.value}`; // Crée un cookie avec la clé basée sur le compteur
      userFav.addEventListener("click", function () {
          // Ajoutez un gestionnaire d'événements pour gérer le clic sur l'élément de la liste
          alert(`La valeur du cookie est : ${input.value}`);
      });
      optionslist.append(userFav); // Ajoute l'élément div à la liste d'options
      numberOfCookies++; // Incrémente la variable globale
      count2++; // Incrémente le compteur pour la prochaine clé de cookie

      // Affiche le nombre de cookies mis à jour après l'ajout
      console.log(numberOfCookies + 1);
  }

  //collapse
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
      var content = coll[i].nextElementSibling;

      if (coll[i].classList.contains("active")) {
          content.style.display = "block";
      } else {
          content.style.display = "none";
      }

      coll[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
              content.style.display = "none";
          } else {
              content.style.display = "block";
          }
      });
  }















