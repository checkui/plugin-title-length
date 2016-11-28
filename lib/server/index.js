const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const plugin = require(path.join(__dirname, '../plugin'))

const app = express();
app.use(bodyParser.json());
app.post('/', (req, res) => {

  reqBody = {
    a: '<!DOCTYPE html><html>  <head>    <title>Hello World</title>  </head>  <body></body></html>',
    b: '<!DOCTYPE html><html>  <head>    <title>Hello CheckUI</title>  </head>  <body></body></html>',
  }

  res.send(plugin.run(reqBody));
});
app.listen(3040, () => console.log('ready'));
