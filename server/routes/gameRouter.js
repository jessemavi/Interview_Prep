const express = require('express');
const gameRouter = express.Router();
const db = require('../db/index');
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'interview-secret'
};

// passport auth strategy
const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
  try {
    console.log('payload received', jwt_payload);
    const query = await db.query(`select * from users where id = ${jwt_payload.id}`);
    const user = query.rows[0];
    console.log('user in passport strategy', user);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  } catch(err) {
    console.log(err);
    res.send(err);
  }
});

passport.use(strategy);

// get all questions and answer_choices for selected category
gameRouter.post('/questions', passport.authenticate('jwt', { session: false }),  async (req, res) => {
  try {
    const allQuestionsAndAnswerChoices = await db.query(`
      select * 
      from question_choices 
      inner join questions on (question_choices.question_id = questions.id and questions.category = '${req.body.category}');
    `);
    res.send(allQuestionsAndAnswerChoices.rows);
  } catch(err) {
    console.log(err);
  }
});

// take user and score from request body and add to db
// send back user and score
gameRouter.post('/add-score', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    console.log(req.body);
    const addedScore = await db.query(`
      insert into game_scores (score, category, user_id) values (${req.body.score}, '${req.body.category}', ${req.body.user_id})
      returning *;
    `);
    res.send(addedScore.rows[0]);
  } catch(err) {
    console.log(err);
  }
});

// get all scores for a user
gameRouter.post('/user-dashboard', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    console.log(req.body);
    const userScores = await db.query(`
      select *
      from game_scores where user_id = ${req.body.user_id};
    `);
    res.send(userScores.rows);
  } catch(err) {
    console.log(err);
  }
});

module.exports = gameRouter;
