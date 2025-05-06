/**
 * Récupère l'élément HTML correspondant à une cellule donnée par ses coordonnées `x` et `y`.
 * @param {number} x - La coordonnée `x` de la cellule.
 * @param {number} y - La coordonnée `y` de la cellule.
 * @returns {HTMLElement|null} L'élément HTML correspondant à la cellule, ou `null` si aucun élément n'est trouvé.
 */
export function DomFromCell(x, y) {
	const grid = document.getElementById("grille");
	const elements = grid.getElementsByTagName('div');
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		if (parseInt(element.getAttribute('data-x')) === x && parseInt(element.getAttribute('data-y')) === y) {
			return element;
		}
	}
	return null;
}

/**
 * Récupère les coordonnées `x` et `y` d'une cellule à partir de son élément HTML.
 * @param {HTMLElement} domCell - L'élément HTML représentant la cellule.
 * @returns {{x: number, y: number}} Un objet contenant les coordonnées `x` et `y` de la cellule.
 */
export function CellFromDom(domCell) {
	return {
		x: parseInt(domCell.getAttribute('data-x')),
		y: parseInt(domCell.getAttribute('data-y'))
	};
}

/**
 * Attend un certain nombre de millisecondes avant de continuer l'exécution.
 * @param {number} ms - Le nombre de millisecondes à attendre.
 * @returns {Promise<void>} Une promesse qui se résout après le délai spécifié.
 */
export function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}