/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const plugin = require(path.join(__dirname, '../plugin'));

const app = express();
app.use(bodyParser.json());
app.post('/', (req, res) => res.json(plugin.run(req.body)));
app.listen(3040, () => console.log('ready'));
