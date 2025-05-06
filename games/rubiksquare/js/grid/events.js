import { moveUp, moveDown, moveLeft, moveRight } from './movement.js';
import { checkForWin } from '../utils/winCheck.js';
import { incrementMoveCount, randomizeGrid, incrementLevel, getCurrentLevel } from './grid.js';

/**
 * Attache des gestionnaires d'événements de clic et de glissement aux cellules de la grille.
 * Permet de déplacer les cellules dans les directions haut, bas, gauche ou droite.
 * @param {HTMLElement} grid - L'élément HTML contenant la grille.
 */
export function attachOnclickEvents(grid) {
    const elements = grid.getElementsByTagName('div');
    Array.from(elements).forEach(element => {
        let startX, startY;

        /**
         * Détecte le début d'un clic ou d'un glissement sur une cellule.
         * @param {MouseEvent} event - L'événement de clic de la souris.
         */
        element.onmousedown = function(event) {
            startX = event.clientX;
            startY = event.clientY;

            /**
             * Détecte le mouvement de la souris pour déterminer la direction du glissement.
             * @param {MouseEvent} event - L'événement de mouvement de la souris.
             */
            document.onmousemove = function(event) {
                const diffX = event.clientX - startX;
                const diffY = event.clientY - startY;

                // Détermine la direction du mouvement
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    if (diffX > 0) {
                        moveRight(element);
                    } else {
                        moveLeft(element);
                    }
                } else {
                    if (diffY > 0) {
                        moveDown(element);
                    } else {
                        moveUp(element);
                    }
                }

                // Mett à jour la position de la grille après le mouvement
                incrementMoveCount();

                // Désactive le mouvement de la souris pour éviter les mouvements multiples
				document.onmousemove = null;

                // Vérifie si le joueur a gagné après chaque mouvement
                if (checkForWin(grid)) {
                    alert(`Bravo, vous avez gagné le niveau ${getCurrentLevel()} !`);
                    incrementLevel();
                    randomizeGrid(grid);
                }
                
            };

            /**
             * Réinitialise les gestionnaires d'événements lorsque le clic est relâché.
             */
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    });
}