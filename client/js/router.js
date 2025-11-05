const router = {
    routes: {
        'home': () => homePage.render(),
        'login': () => loginPage.render(),
        'quiz': (id) => quizPage.render(id)
    },

    navigate(route, param = null) {
        const mainContent = document.getElementById('main-content');
        
        if (this.routes[route]) {
            mainContent.innerHTML = '';
            this.routes[route](param);
        } else {
            mainContent.innerHTML = '<div class="container"><h2>Page not found</h2></div>';
        }
    },

    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // Initial route
        this.handleRoute();
    },

    handleRoute() {
        const hash = window.location.hash.slice(1);
        const [route, param] = hash.split('/');
        
        if (route) {
            this.navigate(route, param);
        } else {
            this.navigate('home');
        }
    }
};