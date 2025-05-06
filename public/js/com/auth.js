/**
 * Classe de gestion de l'authentification
 */
/* CETTE CLASSE NE DOIT PAS ETRE UTILISEE EN DEHORS DE CE PROJET */
class AuthenticationManager {
    /**
     * Nom du cookie utilisé pour stocker les informations d'authentification.
     * @type {string}
     * @constant
     */
    static COOKIE_NAME = 'auth';
    /**
     * Durée d'expiration du cookie en jours.
     * @type {number}
     * @constant
     */
    static COOKIE_EXPIRATION_DAYS = 7;

    /**
     * Enregistre un nouvel utilisateur.
     * 
     * @param {string} username - Nom d'utilisateur.
     * @param {string} password - Mot de passe.
     * @returns {boolean} Retourne `true` si l'enregistrement et la connexion réussissent, sinon `false`.
     */
    static register(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.username === username)) {
            // throw new Error('Username already exists');
            return false;
        } else {
            // stockage    
            const newUser = { username, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            // connexion
            return AuthenticationManager.login(username, password);
        }
    }

    /**
     * Connecte un utilisateur existant.
     * 
     * @param {string} username - Nom d'utilisateur.
     * @param {string} password - Mot de passe.
     * @returns {boolean} Retourne `true` si la connexion réussit, sinon `false`.
     */
    static login(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find(user => user.username === username && user.password === password)) {
            this.setCookie(JSON.stringify({ username, password }), AuthenticationManager.COOKIE_EXPIRATION_DAYS);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Définit un cookie avec une valeur et une durée d'expiration.
     * 
     * @param {string} value - Valeur à stocker dans le cookie.
     * @param {number} days - Durée d'expiration en jours.
     */
    static setCookie(value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        console.log(AuthenticationManager.COOKIE_NAME + "=" + value + ";" + "expires=" + date.toUTCString() + ";path=/");
        document.cookie = AuthenticationManager.COOKIE_NAME + "=" + value + ";" + "expires=" + date.toUTCString() + ";path=/";
    }

    /**
     * Récupère la valeur d'un cookie par son nom.
     * 
     * @param {string} name - Nom du cookie.
     * @returns {string|null} Retourne la valeur du cookie ou `null` s'il n'existe pas.
     */
    static getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     * Vérifie si un utilisateur est connecté.
     * 
     * @returns {boolean} Retourne `true` si un utilisateur est connecté, sinon `false`.
     */
    static isLoggedIn() {
        const authCookie = this.getCookie(AuthenticationManager.COOKIE_NAME);
        if (authCookie) {
            console.log(authCookie); // todo del
            const { username, password } = JSON.parse(authCookie);
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);
            return !!user;
        }
        return false;
    }

    /**
     * Récupère le nom d'utilisateur de l'utilisateur connecté.
     * 
     * @returns {string|null} Retourne le nom d'utilisateur ou `null` si aucun utilisateur n'est connecté.
     */
    static getUsername() {
        const authCookie = this.getCookie(AuthenticationManager.COOKIE_NAME);
        if (authCookie) {
            console.log(`Auth cookie found: ${authCookie}`);
            const { username, password } = JSON.parse(authCookie);
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                console.log(`Logged-in username: ${username}`);
                return username;
            }
        }
        console.log('No logged-in user found.');
        return null; // not ok !!!!
    }

    /**
     * Déconnecte l'utilisateur en supprimant le cookie d'authentification.
     */
    static logout() {
        this.setCookie(AuthenticationManager.COOKIE_NAME, '', -1); // simulation de revocation de token
    }
}
