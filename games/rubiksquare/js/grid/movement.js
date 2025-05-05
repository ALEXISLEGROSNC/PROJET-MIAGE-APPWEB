import { refreshPositions } from './grid.js';

export function moveUp(domCell) {
	const grid = document.getElementById("grille");
	const domCells = grid.getElementsByTagName('div');

	const columnCells = Array.from(domCells).filter(element => parseInt(element.dataset.x) === parseInt(domCell.dataset.x));

	columnCells.forEach(cell => {
		const y = parseInt(cell.dataset.y);
		cell.dataset.y = (y + 4) % 5;
	});

	refreshPositions(grid);
}

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