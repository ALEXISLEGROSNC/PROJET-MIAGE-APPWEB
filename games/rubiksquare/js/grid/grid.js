import { attachOnclickEvents } from './events.js';
import { moveLeft, moveRight, moveUp, moveDown } from './movement.js';
import { wait } from '../utils/utils.js';

export function generateGrid(grid) {
	grid.innerHTML = '';
	let currentX = 0;
	let currentY = 0;

	const colorClasses = ['c1', 'c2', 'c3', 'c4', 'c5'];

	const size = 5;

	for (let i = 0; i < size * size; i++) {
		const cell = document.createElement('div');
		cell.setAttribute('data-x', currentX);
		cell.setAttribute('data-y', currentY);

		const colorClass = colorClasses[currentY % colorClasses.length];
		cell.classList.add('cell', colorClass);
		cell.setAttribute('data-color', colorClass);

		grid.appendChild(cell);
		currentX++;
		
		if (currentX === size) {
			currentX = 0;
			currentY++;
		}
	}

	attachOnclickEvents(grid);
}

export function refreshPositions(grid) {
	const elements = grid.getElementsByTagName('div');
	Array.from(elements).forEach(element => {
		element.style.transform = `translate(${element.dataset.x * 100}px, ${element.dataset.y * 100}px)`;
	});
}

let moveCount = 0;

let lastRandomizeTime = Date.now();

let currentLevel = 1;

export async function randomizeGrid(grid) {
	const elements = Array.from(grid.getElementsByTagName('div'));
	const moves = [moveLeft, moveRight, moveUp, moveDown];
	const numMoves = currentLevel + 2;

	for (let i = 0; i < numMoves; i++) {
		const randomElement = elements[Math.floor(Math.random() * elements.length)];
		const randomMove = moves[Math.floor(Math.random() * moves.length)];
		randomMove(randomElement);
		await wait(100);
	}

	refreshPositions(grid);
	moveCount = 0;
	lastRandomizeTime = Date.now();
}

export function incrementLevel() {
	currentLevel++;
}

export function getCurrentLevel() {
	return currentLevel;
}

export function incrementMoveCount() {
	moveCount++;
}

export function getMoveCount() {
	return moveCount;
}

export function getElapsedTime() {
	return Math.floor((Date.now() - lastRandomizeTime) / 1000);
}