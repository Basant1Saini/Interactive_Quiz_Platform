import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{quiz.title}</h2>
      <div className="question">
        <h3>{quiz.questions[currentQuestion].question}</h3>
        {quiz.questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`btn ${answers[currentQuestion] === index ? 'btn-primary' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={nextQuestion} className="btn btn-primary">
        {currentQuestion < quiz.questions.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
}

export default Quiz;