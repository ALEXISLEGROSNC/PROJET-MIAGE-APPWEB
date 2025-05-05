class ScoreManager {
    static STORAGE_KEY = 'scores';

    static store(username, score, gameName) {
        console.log(`Storing score: username=${username}, score=${score}, gameName=${gameName}`);
        const scores = JSON.parse(localStorage.getItem(ScoreManager.STORAGE_KEY)) || [];
        console.log('Current scores:', scores);
        const newScore = { username, score, gameName };
        scores.push(newScore);
        localStorage.setItem(ScoreManager.STORAGE_KEY, JSON.stringify(scores));
        console.log('Updated scores saved to localStorage:', scores);
    }

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

    static generateScoreModal(username, score, gameName) {
        console.log(`Generating score modal for username=${username}, score=${score}, gameName=${gameName}`);
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.padding = '20px';
        modal.style.backgroundColor = 'white';
        modal.style.border = '1px solid black';
        modal.style.zIndex = '1000';

        const title = document.createElement('h2');
        title.textContent = `Score for ${gameName}`;
        modal.appendChild(title);

        const content = document.createElement('p');
        content.textContent = `${username} scored ${score} points!`;
        modal.appendChild(content);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.onclick = () => {
            console.log('Closing modal');
            document.body.removeChild(modal);
        };
        modal.appendChild(closeButton);

        document.body.appendChild(modal);
        console.log('Score modal displayed');
    }
}