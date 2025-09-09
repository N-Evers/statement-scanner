const { getPositions } = require('./getPositions');
const { groupLines } = require('./groupLines');
const { orderLines } = require('./orderLines');


// Get document text as a string in order for parsing
async function processDocument(fileName) {
    const wordsWithPositions = await getPositions(fileName);
    const sortedLines = await groupLines(wordsWithPositions);
    const orderedLines = await orderLines(sortedLines);
    
    return orderedLines;
}

module.exports = { processDocument };