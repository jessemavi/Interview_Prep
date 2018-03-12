const express = require('express');
const gameRouter = express.Router();
const db = require('../db/index');

// get all questions
gameRouter.get('/questions', async (req, res) => {
  try {
    const allQuestions = await db.query(`select * from questions`);
    res.send(allQuestions.rows);
  } catch(err) {
    console.log(err);
  }
});

module.exports = gameRouter;
