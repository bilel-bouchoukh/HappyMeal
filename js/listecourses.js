// // Vérifier si la page est celle de la liste de courses
if (window.location.search.includes("filename=listecourses")) {

    // Fonction pour afficher la liste des courses
    function displayShoppingList() {
        const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
        const shoppingListContainer = document.getElementById("listecourses");

        if (ingredients.length === 0) {
            shoppingListContainer.innerHTML = "<p style='text-align:center'>Aucun ingrédient ajouté.</p>";
        } else {
            shoppingListContainer.innerHTML = "";

            const ulTag = document.createElement('ul');
            ulTag.classList.add('list-group');  // Ajouter une classe Bootstrap pour une jolie présentation

            ingredients.forEach((ingredient, index) => {
                // Créer un élément de liste (li) pour chaque ingrédient
                const liTag = document.createElement('li');
                liTag.classList.add('list-group-item');  // Ajouter une classe pour le style des éléments de la liste
                liTag.innerHTML = `${ingredient.nom} : ${ingredient.quantite} 
                <button class="btn btn-danger btn-sm float-end delete-btn" data-index="${index}">
                    Supprimer ingédient 
                </button>`;

                ulTag.appendChild(liTag);
            });

            shoppingListContainer.appendChild(ulTag);

            // Ajouter un événement de suppression pour chaque bouton
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', deleteIngredient);
            });
        }
    }

    // Fonction pour supprimer un ingrédient
    function deleteIngredient(event) {
        const index = event.target.closest('button').getAttribute('data-index'); // Récupère l'index de l'ingrédient
        const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];

        // Supprimer l'ingrédient du tableau
        ingredients.splice(index, 1);

        // Sauvegarder la nouvelle liste dans le localStorage
        localStorage.setItem("ingredients", JSON.stringify(ingredients));

        // Réafficher la liste mise à jour
        displayShoppingList();
    }

    // Fonction pour supprimer tous les ingrédients
    function clearShoppingList() {
        // Vider le localStorage pour les ingrédients
        localStorage.removeItem("ingredients");

        // Réafficher la liste mise à jour (qui sera vide)
        displayShoppingList();
    }

    // Appeler la fonction pour afficher la liste au chargement de la page
    displayShoppingList();
}

// Fonction pour télécharger la liste des ingrédients sous forme de fichier JSON
function downloadShoppingList() {
    const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];

    if (ingredients.length === 0) {
        alert("Aucun ingrédient à télécharger.");
        return;
    }

    const ingredientsJSON = JSON.stringify(ingredients, null, 2); // Le paramètre 'null, 2' est pour l'indentation lisible

    // Créer un objet Blob pour contenir les données JSON
    const blob = new Blob([ingredientsJSON], { type: 'application/json' });

    // Créer un lien temporaire pour déclencher le téléchargement
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'liste_courses.json'; // Nom du fichier à télécharger

    // Déclencher le clic du lien pour télécharger le fichier
    link.click();
}

// Fonction pour télécharger la liste des ingrédients sous forme de fichier texte (.txt)
function downloadShoppingListTxt() {
    const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];

    if (ingredients.length === 0) {
        alert("Aucun ingrédient à télécharger.");
        return;
    }

    let ingredientsText = "Liste des ingrédients :\n\n";
    ingredients.forEach(ingredient => {
        ingredientsText += `${ingredient.nom} : ${ingredient.quantite}\n`;
    });

    const blob = new Blob([ingredientsText], { type: 'text/plain' });

    // Créer un lien temporaire pour déclencher le téléchargement
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'liste_courses.txt'; // Nom du fichier à télécharger

    link.click();
}
