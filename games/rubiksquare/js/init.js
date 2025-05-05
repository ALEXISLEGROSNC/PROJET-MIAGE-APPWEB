import { generateGrid, refreshPositions, randomizeGrid, getMoveCount, getElapsedTime, getCurrentLevel } from './grid/grid.js';


window.onload = () => {
    init();
    window.USERSCORE=0; // score init
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            console.log("Réinitialisation du jeu");
            init();
        });
    }
};

function init() {
    console.log("Page et ressources prêtes à l'emploi");
    const grid = document.getElementById("grille");

    generateGrid(grid);
    randomizeGrid(grid);
    refreshPositions(grid);

    // Mettre à jour le score toutes les secondes
    setInterval(updateScore, 1000);
}

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

export function GET_SCORE(){
    return USERSCORE;
}