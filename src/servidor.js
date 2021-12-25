const express = require('express');
const cors = require('cors');
const rotas = require('./rotas');

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors())
app.use(rotas);

module.exports = app;