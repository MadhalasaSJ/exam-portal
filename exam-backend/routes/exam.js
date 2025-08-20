// routes/exam.js
const express = require("express");
const Question = require("../models/Question");
const Result = require("../models/Results");   
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Start Exam
router.get("/start", auth, async (req, res) => {
  const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
  res.json(
    questions.map((q) => ({
      id: q._id,
      question: q.question,
      options: q.options,
    }))
  );
});

// Submit Exam
router.post("/submit", auth, async (req, res) => {
  try {
    const { answers } = req.body;
    let score = 0;

    for (let ans of answers) {
      const q = await Question.findById(ans.id);
      if (q && q.answer === ans.selectedIndex) {
        score++;
      }
    }

    // Save result for logged-in user
    const result = new Result({
      user: req.user.id,
      score,
      date: new Date(),
    });
    await result.save();

    res.json({ score });
  } catch (err) {
    console.error("❌ Submit error:", err);
    res.status(500).json({ msg: "Failed to submit exam" });
  }
});

// Get past results
router.get("/results", auth, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).sort({ date: -1 });
    res.json(results);
  } catch (err) {
    console.error("❌ Fetch results error:", err);
    res.status(500).json({ msg: "Failed to fetch results" });
  }
});

module.exports = router;
