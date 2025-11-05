import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminCreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(60);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const updateQuestion = (idx, field, value) => {
    const q = [...questions];
    q[idx][field] = value;
    setQuestions(q);
  };

  const updateOption = (qIdx, optIdx, value) => {
    const q = [...questions];
    q[qIdx].options[optIdx] = value;
    setQuestions(q);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'x-auth-token': token } : {};
      const payload = { title, description, timeLimit, questions };
      const res = await axios.post('http://localhost:5000/api/quizzes', payload, { headers });
      navigate(`/quiz/${res.data._id}`);
    } catch (err) {
      console.error('Error creating quiz:', err.response || err);
      alert(err.response?.data?.error || 'Failed to create quiz');
    }
  };

  return (
    <div className="container">
      <h2>Create Quiz (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Time limit (seconds)" value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))} />
        <hr />
        <button type="button" onClick={addQuestion} className="btn">Add Question</button>
        {questions.map((q, qi) => (
          <div key={qi} style={{ border: '1px solid #ccc', padding: 8, marginTop: 8 }}>
            <input placeholder="Question text" value={q.question} onChange={(e) => updateQuestion(qi, 'question', e.target.value)} required />
            <div>
              {q.options.map((opt, oi) => (
                <input key={oi} placeholder={`Option ${oi+1}`} value={opt} onChange={(e) => updateOption(qi, oi, e.target.value)} required />
              ))}
            </div>
            <label>
              Correct answer index:
              <input type="number" value={q.correctAnswer} min={0} max={q.options.length-1} onChange={(e) => updateQuestion(qi, 'correctAnswer', Number(e.target.value))} />
            </label>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Create Quiz</button>
      </form>
    </div>
  );
}

export default AdminCreateQuiz;
