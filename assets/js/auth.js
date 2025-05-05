/* CETTE CLASSE NE DOIT PAS ETRE UTILISEE EN DEHORS DE CE PROJET */
class AuthenticationManager {
    static COOKIE_NAME = 'auth';
    static COOKIE_EXPIRATION_DAYS = 7;

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

    static login(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find(user => user.username === username && user.password === password)) {
            this.setCookie(JSON.stringify({ username, password }), AuthenticationManager.COOKIE_EXPIRATION_DAYS);
            return true;
        } else {
            return false;
        }
    }

    static setCookie(value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        console.log(AuthenticationManager.COOKIE_NAME + "=" + value + ";" + "expires=" + date.toUTCString() + ";path=/");
        document.cookie = AuthenticationManager.COOKIE_NAME + "=" + value + ";" + "expires=" + date.toUTCString() + ";path=/";
    }

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

    static logout() {
        this.setCookie(AuthenticationManager.COOKIE_NAME, '', -1); // simulation de revocation de token
    }
}
