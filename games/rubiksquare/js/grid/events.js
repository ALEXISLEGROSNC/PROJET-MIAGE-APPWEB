import { moveUp, moveDown, moveLeft, moveRight } from './movement.js';
import { checkForWin } from '../utils/winCheck.js';
import { incrementMoveCount, randomizeGrid, incrementLevel, getCurrentLevel } from './grid.js';

export function attachOnclickEvents(grid) {
    const elements = grid.getElementsByTagName('div');
    Array.from(elements).forEach(element => {
        let startX, startY;

        element.onmousedown = function(event) {
            startX = event.clientX;
            startY = event.clientY;

            document.onmousemove = async function(event) {
                const diffX = event.clientX - startX;
                const diffY = event.clientY - startY;

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

                incrementMoveCount();

				document.onmousemove = null;

                if (checkForWin(grid)) {
                    alert(`Bravo, vous avez gagné le niveau ${getCurrentLevel()} !`);
                    incrementLevel();
                    randomizeGrid(grid);
                }
                
            };

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    });
}