<!-- 
<div id="calendar-container">
    <div id="calendar"></div>
    <button id="addMealBtn">Ajouter un repas</button>
</div>


<div id="Modal" class="modal">
    <div class="modal-content">
        <span id="modal-close">&times;</span>
        <h2 id="modal-title">Ajouter un repas</h2>
        <div id="recipeList"></div>
    </div>
</div> -->
 
<h1 class="text-center mt-3">Planning des repas</h1>
<div class="container">
        <!-- Calendrier -->
        <div id="calendar-container">
            <div id="calendar"></div>
            <button class="btn btn-primary mt-3 mb-3" id="addMealBtn">Ajouter un repas</button>
        </div>

        <!-- Modal pour ajouter un repas -->
        <div id="Modal" class="modal fade" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="recipeList" class="form-group"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
