const express = require('express');
const app = express();
const logger = require('morgan');
const gameRouter = require('./routes/gameRouter');

const port = process.env.port || 4000;

// middleware
app.use(logger('dev'));

app.use('/game', gameRouter);

app.listen(port, () => {
  console.log(`connected to server on port ${port}`);
});