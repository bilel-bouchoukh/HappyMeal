document.addEventListener('DOMContentLoaded', () => {
    generateCalendar(); // Générer le calendrier
    loadMealsForCalendar(); // Charger les repas existants
});

let selectedDate = null;

// Générer le calendrier pour le mois actuel
function generateCalendar() {
    const calendarContainer = document.getElementById('calendar');
    calendarContainer.innerHTML = ''; // Effacer le calendrier précédent

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    let calendarHTML = daysOfWeek.map(day => `<div class="calendar-header">${day}</div>`).join('');

    // Ajouter des cases vides pour les jours avant le premier jour du mois
    const startingDay = firstDay.getDay();
    for (let i = 0; i < startingDay; i++) {
        calendarHTML += `<div class="calendar-day empty"></div>`;
    }

    // Ajouter les jours du mois dans le calendrier
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = new Date(year, month, i);
        calendarHTML += `
            <div class="calendar-day" data-date="${day.toISOString()}">${i}</div>
        `;
    }

    calendarContainer.innerHTML = calendarHTML;

    // Ajouter un événement pour sélectionner une date
    document.querySelectorAll('.calendar-day:not(.empty)').forEach(cell => {
        cell.addEventListener('click', () => {
            selectDate(new Date(cell.dataset.date));
        });
    });
}

// Sélectionner une date et la surligner
function selectDate(date) {
    selectedDate = date;
    highlightSelectedDate();
}

function highlightSelectedDate() {
    const calendarCells = document.querySelectorAll('.calendar-day');
    calendarCells.forEach(cell => {
        const cellDate = new Date(cell.dataset.date);
        if (cellDate.getDate() === selectedDate.getDate() && cellDate.getMonth() === selectedDate.getMonth()) {
            cell.classList.add('selected');
        } else {
            cell.classList.remove('selected');
        }
    });
}

// Ouvrir le modal pour ajouter un repas
document.getElementById('addMealBtn').addEventListener('click', () => {
    if (selectedDate) {
        openMealModal(selectedDate);
    } else {
        alert('Veuillez sélectionner une date.');
    }
});

function openMealModal(date) {
    const modalContainer = new bootstrap.Modal(document.getElementById("Modal"));
    modalContainer.show();

    const modalTitle = document.getElementById("modal-title");
    modalTitle.innerText = `Ajouter un repas pour ${date.toDateString()}`;

    const recipeList = document.getElementById("recipeList");
    recipeList.innerHTML = ''; // Effacer la liste de repas existants

    loadJsonData().then(recipes => {
        recipes.forEach(recipe => {
            const mealButton = document.createElement('button');
            mealButton.innerText = recipe.nom;
            mealButton.classList.add('btn', 'btn-secondary', 'w-100', 'pb-5');
            mealButton.addEventListener('click', () => {
                saveMealForDate(date, recipe);
                modalContainer.hide();
            });
            recipeList.appendChild(mealButton);
        });
    });
}

// Sauvegarder un repas pour la date sélectionnée
function saveMealForDate(date, recipe) {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];

    meals.push({
        date: date.toISOString(),
        recipe: recipe.nom,
        ingredients: recipe.ingredients,
    });

    localStorage.setItem('meals', JSON.stringify(meals));
    alert(`${recipe.nom} ajouté à ${date.toDateString()} !`);
    updateCalendarMeals(); // Mettre à jour le calendrier
}

// Charger les repas depuis le stockage local et les afficher sur le calendrier
function loadMealsForCalendar() {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    
    meals.forEach(meal => {
        const mealDate = new Date(meal.date);
        const calendarCells = document.querySelectorAll('.calendar-day');
        
        calendarCells.forEach(cell => {
            const cellDate = new Date(cell.dataset.date);
            if (cellDate.getDate() === mealDate.getDate() && cellDate.getMonth() === mealDate.getMonth()) {
                const mealName = document.createElement('div');
                mealName.classList.add('meal-name');
                mealName.innerHTML = `${meal.recipe} <span onclick="deleteMeal('${meal.date}', '${meal.recipe}')">Supprimer</span>`;
                cell.appendChild(mealName);
            }
        });
    });
}

// Recharger les repas après une modification
function updateCalendarMeals() {
    document.querySelectorAll('.meal-name').forEach(name => name.remove());
    loadMealsForCalendar();
}

// Supprimer un repas
function deleteMeal(date, recipe) {
    let meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals = meals.filter(meal => !(meal.date === date && meal.recipe === recipe));
    localStorage.setItem('meals', JSON.stringify(meals));
    updateCalendarMeals(); // Mettre à jour le calendrier après suppression
}

// Charger les recettes depuis un fichier JSON
async function loadJsonData() {
    try {
        const response = await fetch("api/data.json");

        if (!response.ok) throw new Error(`Erreur ${response.status}`);

        const data = await response.json();
        return data.recettes;
    } catch (err) {
        console.error(err);
    }
}
