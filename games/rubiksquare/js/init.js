import { generateGrid, refreshPositions, randomizeGrid, getMoveCount, getElapsedTime, getCurrentLevel } from './grid/grid.js';

/**
 * Fonction exécutée lorsque la page est complètement chargée.
 * Initialise le jeu et configure les événements nécessaires.
 */
window.onload = () => {
    init();
    window.USERSCORE=0; // score init
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        /**
         * Ajoute un gestionnaire d'événements pour le bouton de réinitialisation.
         * Réinitialise le jeu lorsque le bouton est cliqué.
         */
        resetButton.addEventListener("click", () => {
            console.log("Réinitialisation du jeu");
            init();
        });
    }
};

/**
 * Initialise le jeu en générant la grille, en mélangeant les cellules,
 * et en configurant la mise à jour du score.
 */
function init() {
    console.log("Page et ressources prêtes à l'emploi");
    const grid = document.getElementById("grille");

    generateGrid(grid);
    randomizeGrid(grid);
    refreshPositions(grid);

    // Mettre à jour le score toutes les secondes
    setInterval(updateScore, 1000);
}

/**
 * Met à jour les informations de score et les affiche à l'utilisateur.
 * Calcule le score en fonction du niveau, des mouvements et du temps écoulé.
 */
function updateScore() {
    const moveCount = getMoveCount();
    const elapsedTime = getElapsedTime();
    const currentLevel = getCurrentLevel();
    const infosElement = document.getElementById("infosText");
    infosElement.textContent = `Niveau : ${currentLevel}, Mouvements : ${moveCount}, Temps : ${elapsedTime}s`;
    const score = Math.max(0, (currentLevel * 1000) - (moveCount * 10) - (elapsedTime * 5));
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Score : ${score}`;
    window.USERSCORE=score;
}

/**
 * Récupère le score actuel de l'utilisateur.
 * @returns {number} Le score actuel de l'utilisateur.
 */
export function GET_SCORE(){
    return USERSCORE;
}