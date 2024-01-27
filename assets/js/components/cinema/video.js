import { api } from "../../utilities.js";
const apiKey = api();

const hero = document.querySelector('.heroCine');
// const nombreAleatoire = Math.floor(Math.random() * 20);

// async function nowVideoId() {
//     try {
//         const reponse = await fetch(
//             `https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1&api_key=${apiKey}`
//         );

//         if (!reponse.ok) {
//             throw new Error(`HTTP error : ${reponse.status}`);
//         }

//         const data = await reponse.json();
//         const nowPlaying = data.results;

//         if (nowPlaying.length > 0) {
//             const randomIndex = Math.floor(Math.random() * nowPlaying.length);
//             return nowPlaying[randomIndex].id;
//         } else {
//             throw new Error("Aucun film en cours de lecture actuellement.");
//         }
//     } catch (error) {
//         console.error(`error: ${error}`);
//         throw error; // Répéter l'erreur pour que l'appelant puisse la gérer
//     }
// }


// // Utiliser `async` ici
// async function handleNowVideoId() {
//     try {
//         const nowPlayingList = await nowVideoId();
       

//         await video(nowPlayingList)
//     } catch (error) {
        
//         console.error(`Une erreur s'est produite : ${error.message}`);
//     }
// }

// // Appeler la fonction qui gère la liste maintenant
// handleNowVideoId();




export async function video() {
    try {


        const reponse = await fetch(
            `https://api.themoviedb.org/3/movie/572802/videos?language=fr-FR&region=fr&api_key=${apiKey}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
                }
            }
        );
        
        if (!reponse.ok) {
            throw new Error(`HTTP error : ${reponse.status}`);
        }

        const data = await reponse.json();
        const video = data.results;


            hero.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${video[0].key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

    } catch (error) {
        // Traitez l'erreur ici ou laissez-la être répétée selon vos besoins

        console.error(`error: ${error}`);
        // Vous pouvez décider ici si vous voulez réessayer avec un nouvel ID, ou afficher un message d'erreur, etc.
    }
}
