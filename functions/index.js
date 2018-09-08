const functions = require('firebase-functions');
const express = require('express');
const SetCharacterOrchestration = require('./DatabaseOdyssey/lib/regex_generation/set_character/SetCharacterOrchestration');
const SetCharacterGeneration = require('./DatabaseOdyssey/lib/regex_generation/set_character/SetCharacterGeneration');
const RangeReverser = require('./DatabaseOdyssey/lib/regex_generation/char_generation/RangeReverser');
const RegexGeneration = require('./DatabaseOdyssey/lib/regex_generation/RegexGeneration');

const setCharacterGeneration = new SetCharacterGeneration(RangeReverser.buildClassicRangeReverser());
const setCharacterOrchestration = new SetCharacterOrchestration(setCharacterGeneration);

const app = express();
app.get('/regexgeneration', (request, response) => {
    response.send(RegexGeneration.generate(request.query.regex, setCharacterOrchestration))
});

exports.regexgeneration = functions.https.onRequest(app);