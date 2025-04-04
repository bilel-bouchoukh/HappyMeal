fetch("./api/data.json")
  .then(reponse => reponse.json())
  .then(recette => {
    let main_accueil = document.getElementById("accueilrecipeList");

    // Boucle sur les 5 recettes sélectionnées
    Randomize(recette).forEach(recette => {
      let card = document.createElement("div");
      card.className = "col-md-3";

      card.innerHTML = `
        <div class="card mb-3 shadow">
          <img src="./assets/images/${recette.image}" class="card-img-top" style="height:200px; object-fit: cover;"/>
          <div class="card-body text-center">
            <h5 class="card-title m-3">${recette.nom}</h5>
          </div>
        </div>
      `;

      main_accueil.appendChild(card);
    });
});

function Randomize(DataJson){
  let recettesAleatoires = DataJson.recettes
      .sort(() => Math.random() - 0.5) // Mélange aléatoire
      .slice(0, 5); // Prend les 5 premières recettes après mélange

      return recettesAleatoires;
}
