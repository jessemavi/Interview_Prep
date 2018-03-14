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

// login a user
userRouter.post('/login', async (req, res) => {
  try {
    // get user from db
    const query = await db.query(`select * from users where email = '${req.body.email}'`);
    const user = query.rows[0];
    console.log('user', user);

    if(!user) {
      return res.send({error: 'email does not exist'});
    }

    // validate password with hashed password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log('validPassword', validPassword);

    if(!validPassword) {
      return res.send({error: 'wrong password'});
    }

    // create token to send back in response
    const token = await jwt.sign({id: user.id}, 'interview-secret-1', {expiresIn: '10hr'});
    res.send({user_id: user.id, token: token});
  } catch(err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = userRouter;
