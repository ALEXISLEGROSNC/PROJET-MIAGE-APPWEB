/**
 * Classe de gestion des scores.
 * Cette classe permet de stocker, récupérer et afficher les scores des utilisateurs pour différents jeux.
 */
class ScoreManager {
    /**
     * Clé utilisée pour stocker les scores dans le localStorage.
     * @type {string}
     * @constant
     */
    static STORAGE_KEY = 'scores';

    /**
     * Stocke un score pour un utilisateur et un jeu donné.
     * 
     * @param {string} username - Nom d'utilisateur.
     * @param {number} score - Score obtenu par l'utilisateur.
     * @param {string} gameName - Nom du jeu.
     */
    static store(username, score, gameName) {
        console.log(`Storing score: username=${username}, score=${score}, gameName=${gameName}`);
        const scores = JSON.parse(localStorage.getItem(ScoreManager.STORAGE_KEY)) || [];
        console.log('Current scores:', scores);
        const newScore = { username, score, gameName };
        scores.push(newScore);
        localStorage.setItem(ScoreManager.STORAGE_KEY, JSON.stringify(scores));
        console.log('Updated scores saved to localStorage:', scores);
    }

    /**
     * Récupère tous les scores pour un jeu donné.
     * 
     * @param {string} gameName - Nom du jeu.
     * @returns {Array<{username: string, score: number}>} Liste des scores pour le jeu.
     */
    static getAllScoresForGame(gameName) {
        console.log(`Fetching all scores for game: ${gameName}`);
        const scores = JSON.parse(localStorage.getItem(ScoreManager.STORAGE_KEY)) || [];
        console.log('All scores from localStorage:', scores);
        const filteredScores = scores
            .filter(scoreEntry => scoreEntry.gameName === gameName)
            .map(({ username, score }) => ({ username, score }));
        console.log(`Filtered scores for game "${gameName}":`, filteredScores);
        return filteredScores;
    }

    /**
     * Génère et affiche une modale contenant les meilleurs scores pour un jeu donné.
     * 
     * @param {string} gameName - Nom du jeu.
     */
    static generateScoreModal(gameName) {
        // Titre user-friendly au lieu d'afficher le nom de la base
        let displayName = gameName;
        switch (displayName) {
            case 'basket': displayName = 'Basket Canvas'; break;
            case 'rubiks': displayName = 'Rubik\'s Square'; break;
            default: console.log(`"${displayName}" is not a known game name.`); break;
        }
    
        console.log(`Scores - ${displayName}`);
        let scores = this.getAllScoresForGame(gameName);
    
        // On ne garde que le meilleur par utilisateur
        const bestScores = scores.reduce((acc, { username, score }) => {
            if (!acc[username] || acc[username] < score) {
                acc[username] = score;
            }
            return acc;
        }, {});
    
        // Convertir l'objet en tableau pour l'affichage
        const filteredScores = 
            Object.entries(bestScores)
            .map(([username, score]) => ({ username, score }));
    
        // Création de la modale (les styles sont dans assets/css/styles.css)
        const modal = document.createElement('div');
        modal.classList.add('modal');
    
        // Titre de la modale
        const title = document.createElement('h2');
        title.textContent = `Scores - ${displayName}`;
        modal.appendChild(title);
    
        // Table (avec les scores dedans)
        const table = document.createElement('table');
        const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
                const playerHeader = document.createElement('th');
                playerHeader.textContent = 'Joueur';
                const scoreHeader = document.createElement('th');
                scoreHeader.textContent = 'Meilleur Score';
        // les add du header
        headerRow.appendChild(playerHeader);
        headerRow.appendChild(scoreHeader);
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // corps de la table (scores)
        const tbody = document.createElement('tbody');
        if (filteredScores.length > 0) {
            filteredScores.forEach(({ username, score }) => {
                const row = document.createElement('tr');
                    const playerCell = document.createElement('td');
                    playerCell.textContent = username;
                const scoreCell = document.createElement('td');
                scoreCell.textContent = score;
                // les add du tbody
                row.appendChild(playerCell);
                row.appendChild(scoreCell);
                tbody.appendChild(row);
            });
        } else {
            const noScoresRow = document.createElement('tr');

                const noScoresCell = document.createElement('td');
                noScoresCell.textContent = 'Aucune partie enregistrée !';
                noScoresCell.colSpan = 2; // on prend toute la table puisqu'il n'y a rien dedans

                noScoresRow.appendChild(noScoresCell);
                tbody.appendChild(noScoresRow);
        }
    
        table.appendChild(tbody);
        modal.appendChild(table);
    
        // Bouton de fermeture
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Fermer';
        closeButton.classList.add('btn-small');
        closeButton.style.marginTop = '10px';
        closeButton.onclick = () => {
            document.body.removeChild(modal);
            console.log('Score modal closed');
        };
    
        modal.appendChild(closeButton);
    
        // Ajouter la modale au body
        document.body.appendChild(modal);
        console.log('Score modal displayed');
    } 
}