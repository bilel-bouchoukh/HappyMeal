const modalContainer = document.getElementById("Modal");
const modalIngredients = document.getElementById("modal-ingredients");
const recipeList = document.getElementById("recipeList");

const isArray = a => {
    return (Array.isArray(a));
};

document.addEventListener("DOMContentLoaded", () => {
    displayRecipeList();
});

modalContainer.addEventListener("click", event => {
    if (event.target === modalContainer) {
        closePopup();
        cleanPopup();
    }
});

recipeList.addEventListener("click", event => {
    const node = event.target.closest("a");
    if (node && node.matches("a")) {
        event.preventDefault();
        const href = node.getAttribute("href");
        openRecipeModal(href);
    }
});

async function loadJsonData() {
    try {
        const response = await fetch("api/data.json");

        if (!response.ok) throw new Error(`Erreur ${response.status}`)

        const data = await response.json();
        return data.recettes;
    } catch (err) {
        console.error(err);
    }
}

// Fonction pour afficher la liste des recettes
async function displayRecipeList() {
    const recettes = await loadJsonData();
    if (!isArray(recettes)) return;

    const nbRecettes = recettes.length;
    for (let i = 0; i < nbRecettes; i++) {
        const recette = recettes[i];

        const aTag = document.createElement('a');
        const imgTag = document.createElement('img');
        const h3Tag = document.createElement('h3');

        imgTag.classList.add('recipe-image',"m-2" );
        h3Tag.classList.add('recipe-name');
        aTag.classList.add('recipe-image-container','pb-3');

        h3Tag.innerText = recette.nom;
        imgTag.setAttribute("src", `assets/images/${recette.image}`);
        imgTag.setAttribute("style", `height:200px; object-fit: cover;`);
        aTag.setAttribute("href", i);

        // Créer le bouton "Ajouter aux favoris"
        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('btn','btn-primary');
        favoriteButton.innerText = 'Ajouter aux favoris';
        favoriteButton.addEventListener('click', (event) => {
            event.preventDefault();  // Empêcher l'ouverture du modal lors de l'ajout aux favoris
            event.stopPropagation();  // Empêcher la propagation de l'événement de clic
            addToFavorites(recette);  // Ajouter la recette aux favoris
        });

        aTag.append(imgTag, h3Tag, favoriteButton);
        recipeList.appendChild(aTag);
    }
}

// Fonction pour ouvrir la modal d'une recette
async function openRecipeModal(index) {
    const recettes = await loadJsonData();
    if (!isArray(recettes)) return;

    const recette = recettes[index];
    
    document.getElementById('modal-title').innerText = recette.nom;
    document.getElementById('modal-category').innerText = recette.categorie;
    document.getElementById('modal-time').innerText = recette.temps_preparation
    document.getElementById('modal-etapes').innerText = recette.etapes.toString()

    recette.ingredients.forEach(ingredient => {
        const liTag = document.createElement('li');
        const spanTag = document.createElement('span');
        const aTag = document.createElement('a');

        aTag.setAttribute("href", index);
        aTag.classList.add("bi", "bi-pencil-square");
        spanTag.innerText = `${ingredient.nom} : ${ingredient.quantite}`;

        // Ajouter un événement au clic sur l'icône (aTag)
        aTag.onclick = (event) => {
            event.preventDefault(); // Empêcher le comportement par défaut du lien (si c'est un lien)
            addIngredientToLocalStorage(ingredient); // Appel de la fonction pour ajouter l'ingrédient
        };

        liTag.append(aTag, spanTag);
        modalIngredients.appendChild(liTag);
    });

    function addIngredientToLocalStorage(ingredient) {
        // Récupérer les ingrédients existants dans le localStorage (ou un tableau vide si rien n'est trouvé)
        let storedIngredients = JSON.parse(localStorage.getItem("ingredients")) || [];
    
        // Ajouter le nouvel ingrédient
        storedIngredients.push(ingredient);
    
        // Sauvegarder les ingrédients dans le localStorage
        localStorage.setItem("ingredients", JSON.stringify(storedIngredients));
    
        // Afficher un message de confirmation (optionnel)
        alert(`${ingredient.nom} a été ajouté à votre liste d'ingrédients !`);
    }

    // Afficher les étapes sous forme de liste numérotée
    const modalEtapes = document.getElementById('modal-etapes');
    modalEtapes.innerHTML = '';  // Clear any previous steps

    recette.etapes.forEach((etape, index) => {
        const liTag = document.createElement('li');
        liTag.innerText = `${index + 1}. ${etape}`;
        modalEtapes.appendChild(liTag);
    });

    openPopup();
}

// Fonction pour ajouter une recette aux favoris
function addToFavorites(recette) {
    let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

    // Vérifier si la recette est déjà dans les favoris
    if (favoritesList.some(fav => fav.nom === recette.nom)) {
        alert("Cette recette est déjà dans vos favoris.");
        return;
    }

    // Ajouter la recette aux favoris
    favoritesList.push(recette);
    localStorage.setItem('favorites', JSON.stringify(favoritesList));

    alert("Recette ajoutée aux favoris !");
}

// Fonction pour ouvrir la popup
function openPopup() { modalContainer.style.display = "block"; }
// Fonction pour fermer la popup
function closePopup() { modalContainer.style.display = "none"; }

function cleanPopup() {
    modalIngredients.querySelectorAll('li').forEach(element => {
        element.remove();
    });
}
