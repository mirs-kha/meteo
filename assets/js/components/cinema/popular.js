import {  api, modal } from "../../utilities.js"
const apiKey = api();
const populaire = document.querySelector('.populaire')

export async function popular() {
    
    try {
        const reponse = await fetch(
            
            `https://api.themoviedb.org/3/movie/popular?language=fr&page=1&api_key=${apiKey}`);
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }

        const data = await reponse.json();
        const nowPopular = data.results.slice(0, 5)

        for (const popular of nowPopular) {

            populaire.innerHTML += `
            <div class="moments">
                <h3>${popular.title}</h3>
                <img src="https://image.tmdb.org/t/p/w500/${popular.backdrop_path}" />
                <p>${popular.overview.slice(0, 100)}...</p>
                <button class="myBtn btnmin" data-modal-id="modal-${popular.id}">Voir plus</button>
        
                <!-- The Modal -->
                <div id="modal-${popular.id}" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p>${popular.id}</p>
                        <h3>${popular.title}</h3>
                        <div style="display:flex">
                            <div><img src="https://image.tmdb.org/t/p/w500/${popular.poster_path}" /></div>
                            <div style="padding: 0 30px;">
                                <p>${popular.overview}</p>
                                <p>Date de sortie : <strong>${popular.release_date}</strong></p>
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