export function searchFilm (){
    document.getElementById("valid").addEventListener("click", function () {
        const query = document.getElementById("searchFilm").value;
        window.location.href = `resultat.html?query=${query}`;
    });
}