import { refreshPositions } from './grid.js';

/**
 * Déplace toutes les cellules de la colonne contenant la cellule donnée vers le haut.
 * @param {HTMLElement} domCell - La cellule HTML à partir de laquelle le déplacement est initié.
 */
export function moveUp(domCell) {
	const grid = document.getElementById("grille");
	const domCells = grid.getElementsByTagName('div');

	// Filtre les cellules de la même colonne
	const columnCells = Array.from(domCells).filter(element => parseInt(element.dataset.x) === parseInt(domCell.dataset.x));

	// Déplace chaque cellule de la colonne vers le haut
	columnCells.forEach(cell => {
		const y = parseInt(cell.dataset.y);
		cell.dataset.y = (y + 4) % 5;
	});

	// Met à jour les positions des cellules dans la grille
	refreshPositions(grid);
}

/**
 * Déplace toutes les cellules de la colonne contenant la cellule donnée vers le bas.
 * @param {HTMLElement} domCell - La cellule HTML à partir de laquelle le déplacement est initié.
 */
export function moveDown(domCell) {
	const grid = document.getElementById("grille");
	const domCells = grid.getElementsByTagName('div');

	const columnCells = Array.from(domCells).filter(element => parseInt(element.dataset.x) === parseInt(domCell.dataset.x));

	columnCells.forEach(cell => {
		const y = parseInt(cell.dataset.y);
		cell.dataset.y = (y + 1) % 5;
	});

	refreshPositions(grid);
}

/**
 * Déplace toutes les cellules de la ligne contenant la cellule donnée vers la gauche.
 * @param {HTMLElement} domCell - La cellule HTML à partir de laquelle le déplacement est initié.
 */
export function moveLeft(domCell) {
	const grid = document.getElementById("grille");
	const domCells = grid.getElementsByTagName('div');

	const rowCells = Array.from(domCells).filter(element => parseInt(element.dataset.y) === parseInt(domCell.dataset.y));

	rowCells.forEach(cell => {
		const x = parseInt(cell.dataset.x);
		cell.dataset.x = (x + 4) % 5;
	});

	refreshPositions(grid);
}

/**
 * Déplace toutes les cellules de la ligne contenant la cellule donnée vers la droite.
 * @param {HTMLElement} domCell - La cellule HTML à partir de laquelle le déplacement est initié.
 */
export function moveRight(domCell) {
	const grid = document.getElementById("grille");
	const domCells = grid.getElementsByTagName('div');

	const rowCells = Array.from(domCells).filter(element => parseInt(element.dataset.y) === parseInt(domCell.dataset.y));

	rowCells.forEach(cell => {
		const x = parseInt(cell.dataset.x);
		cell.dataset.x = (x + 1) % 5;
	});

	refreshPositions(grid);
}