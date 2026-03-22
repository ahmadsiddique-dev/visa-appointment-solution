const express = require('express')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

module.exports.app = app;
module.exports.port = port