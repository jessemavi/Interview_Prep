const express = require('express');
const gameRouter = express.Router();
const db = require('../db/index');

// get all questions and answer_choices
gameRouter.get('/questions', async (req, res) => {
  try {
    const allQuestionsAndAnswerChoices = await db.query(`
        select * 
        from question_choices 
        inner join questions on (question_choices.question_id = questions.id);
      `);
    res.send(allQuestionsAndAnswerChoices.rows);
  } catch(err) {
    console.log(err);
  }
});

module.exports = gameRouter;
