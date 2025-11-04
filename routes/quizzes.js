const express = require('express');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'username');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create quiz
router.post('/', auth, async (req, res) => {
  try {
    const quiz = new Quiz({ ...req.body, createdBy: req.user.id });
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit quiz result
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { score, timeTaken } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    
    const result = new Result({
      user: req.user.id,
      quiz: req.params.id,
      score,
      totalQuestions: quiz.questions.length,
      timeTaken
    });
    
    await result.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;