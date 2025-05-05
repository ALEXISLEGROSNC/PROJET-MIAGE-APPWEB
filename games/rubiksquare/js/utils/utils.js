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

export function CellFromDom(domCell) {
	return {
		x: parseInt(domCell.getAttribute('data-x')),
		y: parseInt(domCell.getAttribute('data-y'))
	};
}

export function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}