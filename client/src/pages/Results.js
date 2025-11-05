import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Results() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchResult();
  }, [id]);

  const fetchResult = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'x-auth-token': token } : {};
      const response = await axios.get(`http://localhost:5000/api/quizzes/results/${id}`, { headers });
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  };

  if (!result) return <div>Loading result...</div>;

  return (
    <div className="container">
      <h2>Result for {result.quiz.title}</h2>
      <p>User: {result.user.username}</p>
      <p>Score: {result.score} / {result.totalQuestions}</p>
      <p>Time taken: {result.timeTaken}s</p>
      <h3>Answers summary</h3>
      <ul>
        {result.quiz.questions.map((q, idx) => (
          <li key={idx}>
            <strong>{q.question}</strong>
            <div>Correct answer: {q.options[q.correctAnswer]}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
