const functions = require('firebase-functions');
const express = require('express');

const RegexGenerationController = require('./RegexGenerationController');

const app = express();
app.get('/regexgeneration', RegexGenerationController);

exports.regexgeneration = functions.https.onRequest(app);