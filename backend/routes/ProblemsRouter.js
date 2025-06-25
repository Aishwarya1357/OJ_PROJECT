const router = require('express').Router();
const ensureProblemAccess = require('../Middlewares/ProblemAuth'); // adjust path if needed

// ✅ Protected route: Only authenticated users can access
router.get('/', ensureProblemAccess, (req, res) => {
  res.status(200).json([
    {
      title: "Two Sum",
      difficulty: "Easy",
      acceptance: "45.6%",
      tags: ["array", "hash-table"]
    },
    {
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      acceptance: "29.4%",
      tags: ["binary-search", "divide-and-conquer"]
    },
    {
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      acceptance: "32.1%",
      tags: ["string", "sliding-window"]
    }
  ]);
});

module.exports = router;

