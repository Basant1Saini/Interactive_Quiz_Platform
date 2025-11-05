import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (quiz && typeof quiz.timeLimit === 'number') {
      setTimeLeft(quiz.timeLimit);
    }
  }, [quiz]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      // auto-submit
      handleSubmit();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft]);

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
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      // compute timeTaken
      const totalTime = typeof quiz.timeLimit === 'number' ? quiz.timeLimit : 0;
      const timeTaken = totalTime - (timeLeft || 0);

      const token = localStorage.getItem('token');
      const headers = token ? { 'x-auth-token': token } : {};

      const response = await axios.post(
        `http://localhost:5000/api/quizzes/${id}/submit`,
        { answers, timeTaken },
        { headers }
      );

      // navigate to results page
      const result = response.data;
      navigate(`/results/${result._id}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{quiz.title}</h2>
      {timeLeft !== null && (
        <div className="timer">Time left: {timeLeft}s</div>
      )}
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