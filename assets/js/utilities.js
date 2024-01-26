export function obtenirDateDuJour() {
    const date = new Date();

    // Récupérer l'année, le mois et le jour
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont de 0 à 11, donc ajoutez 1
    const jour = String(date.getDate()).padStart(2, '0');

    // Assembler la date dans le format "yyyy-mm-dd"
    const dateFormatted = `${annee}-${mois}-${jour}`;

    return dateFormatted;
}

export function obtenirDateDuMoisSuivant() {
    const date = new Date();
    
    // Récupérer l'année, le mois et le jour
    let annee = date.getFullYear();
    let mois = date.getMonth() + 2;  // Les mois sont de 0 à 11, donc ajoutez 1
    const jour = date.getDate();

    // Gérer le cas où le mois est décembre
    if (mois === 12) {
        mois = 1;  // Remettre le mois à 1 pour janvier
        annee++;   // Augmenter l'année d'un
    } else {
        mois++;    // Sinon, simplement ajouter 1 au mois
    }

    // Formater la date dans le format "yyyy-mm-dd"
    const dateFormatted = `${annee}-${String(mois).padStart(2, '0')}-${String(jour).padStart(2, '0')}`;

    return dateFormatted;
}

export function obtenirDateDuMoisPrecedent() {
    const date = new Date();
    
    // Récupérer l'année, le mois et le jour
    let annee = date.getFullYear();
    let mois = date.getMonth() - 2;  // Les mois sont de 0 à 11, donc soustraire 2
    const jour = date.getDate();

    // Gérer le cas où le mois est janvier (0) ou février (1)
    if (mois < 0) {
        mois += 12;  // Ajouter 12 pour revenir à l'année précédente
        annee--;     // Soustraire l'année d'un
    }

    // Formater la date dans le format "yyyy-mm-dd"
    const dateFormatted = `${annee}-${String(mois + 1).padStart(2, '0')}-${String(jour).padStart(2, '0')}`;

    return dateFormatted;
}

export function api(){
    const apiKey = '34e37f5a58e47db00f85928579f900f8';
    return apiKey
}


export async function modal() {
    // Sélectionnez tous les boutons et modales avec les nouvelles classes
    const btns = document.querySelectorAll(".myBtn");
    const modals = document.querySelectorAll(".modal");
    const spans = document.querySelectorAll(".close");
    
    // Ajoutez des écouteurs d'événements à chaque bouton
    btns.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            modals[index].style.display = "block";
            
        });
    });
    
    // Ajoutez des écouteurs d'événements à chaque bouton de fermeture
    spans.forEach((span, index) => {
        span.addEventListener("click", function () {
            modals[index].style.display = "none";
        });
    });
    
    // Ajoutez un écouteur d'événements à la fenêtre pour fermer la modal en dehors du contenu
    window.addEventListener("click", function (event) {
        modals.forEach((modal) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    });
}


