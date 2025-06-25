// backend/index.js
const express = require('express');
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

// ✅ MongoDB connection
require('./models/db');

// ✅ Routers
const AuthRouter = require('./routes/AuthRouter');
const ProblemRouter = require('./routes/ProblemsRouter');

// ✅ Middleware setup
app.use(cors());
app.use(bodyParser.json());

// ✅ Routes
app.use('/auth', AuthRouter);         // Authentication Routes (signup/login)
app.use('/problems', ProblemRouter);  // Protected Problem Routes

// ✅ Health check route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// ✅ Server listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
