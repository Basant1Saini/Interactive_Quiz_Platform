// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Update navbar based on auth status
    auth.updateNavbar();
    
    // Initialize router
    router.init();
    
    // Handle hash changes
    window.addEventListener('hashchange', () => {
        router.handleRoute();
    });
});