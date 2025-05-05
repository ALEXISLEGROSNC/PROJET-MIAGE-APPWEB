/**
 * 
 * @param {*} grid 
 * @returns 
 */
export function checkForWin(grid) {
    const couleurs = getGridColors(grid);

    // Vérification de la validité de la grille
    if (!couleurs || couleurs.length === 0 || couleurs[0].length === 0) {
        console.error("La grille est vide ou mal structurée.");
        return false;
    }

    // Vérifier si toutes les lignes sont identiques
    let allLinesIdentical = true;
    for (let y = 0; y < couleurs.length; y++) {
        const couleur = couleurs[y][0];
        if (!couleur) {
            allLinesIdentical = false;
            break;
        }
        for (let x = 0; x < couleurs[y].length; x++) {
            if (couleurs[y][x] !== couleur) {
                allLinesIdentical = false;
                break;
            }
        }
        if (!allLinesIdentical) break;
    }

    // Vérifier si toutes les colonnes sont identiques
    let allColumnsIdentical = true;
    for (let x = 0; x < couleurs[0].length; x++) {
        const couleur = couleurs[0][x];
        if (!couleur) {
            allColumnsIdentical = false;
            break;
        }
        for (let y = 0; y < couleurs.length; y++) {
            if (couleurs[y][x] !== couleur) {
                allColumnsIdentical = false;
                break;
            }
        }
        if (!allColumnsIdentical) break;
    }

    // Si toutes les lignes ou toutes les colonnes sont identiques, victoire
    if (allLinesIdentical || allColumnsIdentical) {
        console.log("Victoire détectée : toutes les lignes ou colonnes sont identiques !");
        return true;
    }

    return false; // Pas de victoire
}

/**
 * 
 * @param {*} grid 
 * @returns 
 */
function getGridColors(grid) {
    const size = Math.sqrt(grid.children.length);
    const cells = Array.from(grid.getElementsByClassName('cell'));

    const couleurs = [];
    for (let y = 0; y < size; y++) {
        const row = [];
        for (let x = 0; x < size; x++) {
            const cell = cells.find(
                c => parseInt(c.getAttribute('data-x')) === x && parseInt(c.getAttribute('data-y')) === y
            );
            row.push(cell ? cell.getAttribute('data-color') : null);
        }
        couleurs.push(row);
    }
    console.log("Couleurs récupérées :", couleurs); // Log des couleurs
    return couleurs;
}