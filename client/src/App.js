import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import AdminCreateQuiz from './pages/AdminCreateQuiz';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/admin/create" element={<AdminCreateQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;