const auth = {
    isLoggedIn() {
        return !!localStorage.getItem('token');
    },

    async login(credentials) {
        try {
            const response = await api.login(credentials);
            localStorage.setItem('token', response.token);
            this.updateNavbar();
            router.navigate('home');
            return response;
        } catch (error) {
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
        this.updateNavbar();
        router.navigate('home');
    },

    updateNavbar() {
        const loginLink = document.getElementById('login-link');
        const logoutLink = document.getElementById('logout-link');
        
        if (this.isLoggedIn()) {
            loginLink.style.display = 'none';
            logoutLink.style.display = 'inline';
        } else {
            loginLink.style.display = 'inline';
            logoutLink.style.display = 'none';
        }
    }
};