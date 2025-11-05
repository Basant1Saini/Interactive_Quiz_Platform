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

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'username');
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create quiz (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check admin role
    const User = require('../models/User');
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ error: 'User not found' });
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });

    const quiz = new Quiz({ ...req.body, createdBy: req.user.id });
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit quiz result - accept answers array and timeTaken; compute score server-side
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { answers, timeTaken } = req.body; // answers: array of selected option indices
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const total = quiz.questions.length;
    let score = 0;

    if (Array.isArray(answers)) {
      for (let i = 0; i < total; i++) {
        const correct = quiz.questions[i] && typeof quiz.questions[i].correctAnswer === 'number'
          ? quiz.questions[i].correctAnswer
          : null;
        if (correct !== null && answers[i] === correct) score += 1;
      }
    }

    const result = new Result({
      user: req.user.id,
      quiz: req.params.id,
      score,
      totalQuestions: total,
      timeTaken: timeTaken || 0
    });

    await result.save();
    // return populated result for client convenience
    await result.populate('quiz', 'title');
    await result.populate('user', 'username');

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific result by result id
router.get('/results/:resultId', auth, async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId).populate('quiz', 'title questions').populate('user', 'username');
    if (!result) return res.status(404).json({ error: 'Result not found' });
    // allow owners or admins to view
    const User = require('../models/User');
    const requestingUser = await User.findById(req.user.id);
    if (result.user._id.toString() !== req.user.id && (!requestingUser || requestingUser.role !== 'admin')) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user's results
router.get('/results/me', auth, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).populate('quiz', 'title');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;