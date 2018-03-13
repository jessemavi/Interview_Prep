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

// take user and score from request body and add to db
// send back user and score
gameRouter.post('/add-score', async (req, res) => {
  try {
    console.log(req.body);
    const addedScore = await db.query(`
      insert into game_scores (score, user_id) values (${req.body.score}, ${req.body.user_id})
      returning *;
    `);
    res.send(addedScore.rows[0]);
  } catch(err) {
    console.log(err);
  }
});

module.exports = gameRouter;
