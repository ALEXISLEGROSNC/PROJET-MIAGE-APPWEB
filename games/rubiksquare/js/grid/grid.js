import { attachOnclickEvents } from './events.js';
import { moveLeft, moveRight, moveUp, moveDown } from './movement.js';
import { wait } from '../utils/utils.js';

/**
 * Génère une grille HTML dans l'élément spécifié.
 * @param {HTMLElement} grid - L'élément HTML où la grille sera générée.
 */
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

/**
 * Met à jour les positions des cellules dans la grille en fonction de leurs attributs `data-x` et `data-y`.
 * @param {HTMLElement} grid - L'élément HTML contenant la grille.
 */
export function refreshPositions(grid) {
	const elements = grid.getElementsByTagName('div');
	Array.from(elements).forEach(element => {
		element.style.transform = `translate(${element.dataset.x * 100}px, ${element.dataset.y * 100}px)`;
	});
}

let moveCount = 0; // Compteur de mouvements effectués par l'utilisateur

let lastRandomizeTime = Date.now(); // Temps de la dernière randomisation

let currentLevel = 1; // Niveau actuel du jeu, initialisé à 1

/**
 * Mélange les cellules de la grille de manière aléatoire.
 * @param {HTMLElement} grid - L'élément HTML contenant la grille.
 * @returns {Promise<void>} Une promesse qui se résout une fois le mélange terminé.
 */
export async function randomizeGrid(grid) {
	const elements = Array.from(grid.getElementsByTagName('div'));
	const moves = [moveLeft, moveRight, moveUp, moveDown];
	const numMoves = currentLevel + 2;

	for (let i = 0; i < numMoves; i++) {
		const randomElement = elements[Math.floor(Math.random() * elements.length)];
		const randomMove = moves[Math.floor(Math.random() * moves.length)];
		randomMove(randomElement);
		await wait(100); // Attendre 100 ms entre chaque mouvement pour une animation fluide
	}

	refreshPositions(grid);
	moveCount = 0;
	lastRandomizeTime = Date.now();
}

/**
 * Incrémente le niveau actuel du jeu.
 */
export function incrementLevel() {
	currentLevel++;
}

/**
 * Récupère le niveau actuel du jeu.
 * @returns {number} Le niveau actuel du jeu.
 */
export function getCurrentLevel() {
	return currentLevel;
}

/**
 * Incrémente le compteur de mouvements effectués par l'utilisateur.
 */
export function incrementMoveCount() {
	moveCount++;
}

/**
 * Récupère le nombre de mouvements effectués par l'utilisateur.
 * @returns {number} Le nombre de mouvements effectués par l'utilisateur.
 */
export function getMoveCount() {
	return moveCount;
}

/**
 * Récupère le temps écoulé depuis la dernière randomisation de la grille, soit depuis le début du niveau en cours.
 * @returns {number} Le temps écoulé depuis la dernière randomisation en secondes.
 */
export function getElapsedTime() {
	return Math.floor((Date.now() - lastRandomizeTime) / 1000);
}