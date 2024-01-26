import {  api, modal } from "../../utilities.js"
const apiKey = api();
const enCeMoment = document.querySelector('.moment')


export async function nowPlaying() {
    
    try {
        const reponse = await fetch(
            
            `https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1&api_key=${apiKey}`);
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }

        const data = await reponse.json();
        const nowPlaying = data.results.slice(0, 10)

        for (const now of nowPlaying) {

            enCeMoment.innerHTML += `
            <div class="moments">
                <h3>${now.title}</h3>
                <img src="https://image.tmdb.org/t/p/w500/${now.poster_path}" />
                <p>${now.overview.slice(0, 100)}...</p>
                <button class="myBtn" data-modal-id="modal-${now.id}">Voir plus</button>
        
                <!-- The Modal -->
                <div id="modal-${now.id}" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p>${now.id}</p>
                        <h3>${now.title}</h3>
                        <div style="display:flex">
                            <div><img src="https://image.tmdb.org/t/p/w500/${now.poster_path}" /></div>
                            <div style="padding: 0 30px;">
                                <p>${now.overview}</p>
                                <p>Date de sortie : <strong>${now.release_date}</strong></p>
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




















