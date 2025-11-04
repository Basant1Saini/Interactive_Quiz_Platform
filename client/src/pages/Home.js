import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  return (
    <div className="container">
      <h1>Interactive Quiz Platform</h1>
      <div className="quiz-list">
        {quizzes.map(quiz => (
          <div key={quiz._id} className="quiz-card">
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <button className="btn btn-primary">Take Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;