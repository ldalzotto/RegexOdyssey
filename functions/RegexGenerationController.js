const SetCharacterOrchestration = require('./DatabaseOdyssey/lib/regex_generation/set_character/SetCharacterOrchestration');
const SetCharacterGeneration = require('./DatabaseOdyssey/lib/regex_generation/set_character/SetCharacterGeneration');
const RangeReverser = require('./DatabaseOdyssey/lib/regex_generation/char_generation/RangeReverser');
const RegexGenerationWithOptions = require('./DatabaseOdyssey/lib/regex_generation/RegexGenerationWithOptions');

const setCharacterGeneration = new SetCharacterGeneration(RangeReverser.buildClassicRangeReverser());
const setCharacterOrchestration = new SetCharacterOrchestration(setCharacterGeneration);

module.exports = (request, response) => {
    let inputRegex = request.query.regex;
    if (!inputRegex) {
        inputRegex = "";
    }

    let options = request.query.options;
    if (!options) {
        options = '{}';
    }
    response.send(RegexGenerationWithOptions.generationWithOptions(inputRegex, setCharacterOrchestration, JSON.parse(options)));
};