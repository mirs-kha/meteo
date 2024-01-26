import { obtenirDateDuJour,  obtenirDateDuMoisPrecedent, api, modal } from "../../utilities.js"


const dateDuJour = obtenirDateDuJour();

const dateDuMoisPrecedent = obtenirDateDuMoisPrecedent()

const avenir = document.querySelector('.avenir')
const apiKey = api();


// https://api.themoviedb.org/3/discover/movie?language=fr-FR&region=fr&page=1&sort_by=popularity.desc&with_release_type=2|3&primary_release_date.gte=${dateDuMoisPrecedent}&primary_release_date.lte=${dateDuJour}&api_key=${apiKey}

export async function upComing() {
    try {
        const reponse = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1&api_key=${apiKey}`);
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }

        const data = await reponse.json();
        const upComing = data.results.slice(0, 10)

        for (const movie of upComing) {
            const myId = movie.id

            avenir.innerHTML += `
            <div class="avenirs">
                <div class="filmavenir">
                    <h3>${movie.title}</h3>
                    <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" />
                    <p>${movie.overview.slice(0, 100)}...</p>
                    <button class="myBtn btnmin" data-modal-id="modal-${myId}">Voir plus</button>
            
                    <!-- The Modal -->
                    <div id="modal-${myId}" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <p>${myId}</p>
                            <h3>${movie.title}</h3>
                            <div style="display:flex">
                                <div><img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" /></div>
                                <div style="padding: 0 30px;">
                                    <p>${movie.overview}</p>
                                    <p>Date de sortie : <strong>${movie.release_date}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            
        }

        modal()
        
       

    } catch (error) {
        console.error(`error: ${error}`);
    }
}