// document.addEventListener('DOMContentLoaded', () => {
//     const container_fav = document.getElementById('container-fav');

//     let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

//     favoritesList.forEach(recette => {
//         const favItem = document.createElement('div');
//         favItem.classList.add("table-item", "col-md-3", "shadow", "mb-5");
//         favItem.innerHTML = `
//             <img src="${recette.image}" class="card-img-top" style="height:200px; object-fit: cover;"/>
//             <div class="card-body text-center">
//                 <h5 class="card-title m-3">${recette.nom}</h5>
//                 <h6>Ingrédients :</h6>
//                 <ul class="list-group list-group-flush">
//                     ${recette.ingredients.map(ingredient => 
//                         `<li class="list-group-item">${ingredient.nom} - ${ingredient.quantite}</li>`).join('')}
//                 </ul>
//             </div>
//         `;
//         container_fav.appendChild(favItem);
//     });
// });

// document.getElementById('clear-favorites').addEventListener('click', () => {
//     localStorage.removeItem('favorites');
//     location.reload(); 
// });


document.addEventListener('DOMContentLoaded', () => {
    const container_fav = document.getElementById('container-fav');

    let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favoritesList.length === 0) {
        container_fav.innerHTML = `<p>Aucune recette ajoutée aux favoris.</p>`;
    }

    favoritesList.forEach(recette => {
        const favItem = document.createElement('div');
        favItem.classList.add("col-md-4", "mb-4"); // Ajout de la colonne pour un affichage responsive

        favItem.innerHTML = `
            <div class="card shadow-sm h-100">
                <!-- Image de la recette -->
                <img src="assets/images/${recette.image}" class="card-img-top" alt="${recette.nom}" style="height:200px; object-fit: cover;"/>
                <div class="card-body text-center">
                    <h5 class="card-title">${recette.nom}</h5>
                    <h6 class="mt-3">Ingrédients :</h6>
                    <ul class="list-group list-group-flush">
                        ${recette.ingredients.map(ingredient => 
                            `<li class="list-group-item">${ingredient.nom} - ${ingredient.quantite}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        container_fav.appendChild(favItem);
    });
});

document.getElementById('clear-favorites').addEventListener('click', () => {
    localStorage.removeItem('favorites');
    location.reload(); 
});
