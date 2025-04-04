<!-- <div class="container_listecourses">

    <div id="listecourses" class="row d-flex justify-content-center"></div>

</div>

<div class="text-center my-4">

        <button class="btn btn-secondary" onclick="downloadShoppingListTxt()">Télécharger la liste</button>
</div> -->
<h1 style="text-align: center;" class="m-3">Liste de courses :</h1>
<div class="container_listecourses">
    <div id="listecourses" class="row d-flex justify-content-center"></div>
</div>

<div class="d-flex justify-content-center gap-3 my-4">
    <!-- Bouton pour télécharger la liste en format .txt -->
    <button class="btn btn-secondary" onclick="downloadShoppingListTxt()">Télécharger la liste</button>

    <!-- Bouton pour supprimer tous les ingrédients -->
    <button class="btn btn-danger" onclick="clearShoppingList()">Supprimer tout</button>
</div>

