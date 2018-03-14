const express = require('express');
const userRouter = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// add a new user(signup)
userRouter.post('/add-user', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const query = await db.query(`
      insert into users (username, email, password)
        values ('${req.body.username}', '${req.body.email}', '${hashedPassword}')
      returning 
        id, username, email;
    `);

    const user = query.rows[0];
    console.log('user', user);

    const token = await jwt.sign({id: user.id}, 'interview-secret-1', {expiresIn: '10hr'});

    res.send({user_id: user.id, token: token});
  } catch(err) {
    console.log(err);
    res.send(err.detail);
  }
});

module.exports = userRouter;