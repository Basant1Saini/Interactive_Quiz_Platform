const homePage = {
    async render() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="container">
                <h1>Interactive Quiz Platform</h1>
                <div id="quiz-list" class="quiz-list">
                    <div class="loading">Loading quizzes...</div>
                </div>
            </div>
        `;

        try {
            const quizzes = await api.getQuizzes();
            this.renderQuizzes(quizzes);
        } catch (error) {
            document.getElementById('quiz-list').innerHTML = `
                <div class="error">Error loading quizzes: ${error.message}</div>
            `;
        }
    },

    renderQuizzes(quizzes) {
        const quizList = document.getElementById('quiz-list');
        
        if (quizzes.length === 0) {
            quizList.innerHTML = '<p>No quizzes available.</p>';
            return;
        }

        quizList.innerHTML = quizzes.map(quiz => `
            <div class="quiz-card">
                <h3>${quiz.title}</h3>
                <p>${quiz.description || 'No description available'}</p>
                <p><strong>Questions:</strong> ${quiz.questions.length}</p>
                <button class="btn btn-primary" onclick="router.navigate('quiz', '${quiz._id}')">
                    Take Quiz
                </button>
            </div>
        `).join('');
    }
};