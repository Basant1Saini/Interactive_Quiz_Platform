const quizPage = {
    currentQuiz: null,
    currentQuestion: 0,
    answers: [],
    startTime: null,

    async render(quizId) {
        if (!auth.isLoggedIn()) {
            router.navigate('login');
            return;
        }

        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '<div class="container"><div class="loading">Loading quiz...</div></div>';

        try {
            this.currentQuiz = await api.getQuiz(quizId);
            this.currentQuestion = 0;
            this.answers = new Array(this.currentQuiz.questions.length).fill(null);
            this.startTime = Date.now();
            this.renderQuestion();
        } catch (error) {
            mainContent.innerHTML = `
                <div class="container">
                    <div class="error">Error loading quiz: ${error.message}</div>
                </div>
            `;
        }
    },

    renderQuestion() {
        const mainContent = document.getElementById('main-content');
        const question = this.currentQuiz.questions[this.currentQuestion];
        const isLast = this.currentQuestion === this.currentQuiz.questions.length - 1;

        mainContent.innerHTML = `
            <div class="container">
                <div class="card">
                    <h2>${this.currentQuiz.title}</h2>
                    <p>Question ${this.currentQuestion + 1} of ${this.currentQuiz.questions.length}</p>
                    
                    <div class="question">
                        <h3>${question.question}</h3>
                        <div class="options">
                            ${question.options.map((option, index) => `
                                <div class="option ${this.answers[this.currentQuestion] === index ? 'selected' : ''}" 
                                     onclick="quizPage.selectAnswer(${index})">
                                    ${option}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div>
                        ${this.currentQuestion > 0 ? 
                            '<button class="btn" onclick="quizPage.previousQuestion()">Previous</button>' : ''}
                        <button class="btn btn-primary" onclick="quizPage.${isLast ? 'submitQuiz' : 'nextQuestion'}()">
                            ${isLast ? 'Submit Quiz' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    selectAnswer(index) {
        this.answers[this.currentQuestion] = index;
        this.renderQuestion();
    },

    nextQuestion() {
        if (this.currentQuestion < this.currentQuiz.questions.length - 1) {
            this.currentQuestion++;
            this.renderQuestion();
        }
    },

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderQuestion();
        }
    },

    async submitQuiz() {
        const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
        
        try {
            const result = await api.submitQuiz(this.currentQuiz._id, this.answers, timeTaken);
            this.showResults(result);
        } catch (error) {
            alert('Error submitting quiz: ' + error.message);
        }
    },

    showResults(result) {
        const mainContent = document.getElementById('main-content');
        const percentage = Math.round((result.score / result.totalQuestions) * 100);

        mainContent.innerHTML = `
            <div class="container">
                <div class="card">
                    <h2>Quiz Complete!</h2>
                    <h3>${this.currentQuiz.title}</h3>
                    <p><strong>Score:</strong> ${result.score} / ${result.totalQuestions} (${percentage}%)</p>
                    <p><strong>Time:</strong> ${result.timeTaken} seconds</p>
                    <button class="btn btn-primary" onclick="router.navigate('home')">Back to Home</button>
                </div>
            </div>
        `;
    }
};