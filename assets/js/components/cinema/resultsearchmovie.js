import {  api } from "../../utilities.js"
import { searchFilm  } from "./searchfilm.js"
searchFilm ()
const apiKey = api();

const title = document.querySelector('title')



document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    title.innerHTML = query
    
    if (query) {
        fetchMovies(query);
    }
});

async function fetchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=fr-FR&page=1&api_key=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error : ${response.status}`);
        }

        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

function displayResults(results) {
    const avenir = document.querySelector('.avenir')

    if (results.length === 0) {
        avenir.innerHTML = "<p>Aucun résultat trouvé.</p>";
        return;
    }
    const noimage = "assets/img/noimage.png"

    const resultList = results.map(movie => 
`
    <div class="avenirs">
        <div class="filmavenir">
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" />
            <p>${movie.overview.slice(0, 100)}...</p>
        </div>
    </div>`).join("");

avenir.innerHTML = resultList;
}
