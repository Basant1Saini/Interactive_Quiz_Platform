const API_BASE = 'http://localhost:5000/api';

const api = {
    async request(endpoint, options = {}) {
        const url = `${API_BASE}${endpoint}`;
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'x-auth-token': token })
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || data.msg || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Auth endpoints
    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },

    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    // Quiz endpoints
    async getQuizzes() {
        return this.request('/quizzes');
    },

    async getQuiz(id) {
        return this.request(`/quizzes/${id}`);
    },

    async submitQuiz(id, answers, timeTaken) {
        return this.request(`/quizzes/${id}/submit`, {
            method: 'POST',
            body: JSON.stringify({ answers, timeTaken })
        });
    }
};