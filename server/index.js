const express = require('express');
const app = express();
const db = require('./db/index');

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`connected to server on port ${port}`);
});