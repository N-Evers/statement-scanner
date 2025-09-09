const { readText } = require('../googleAI')

// Get words mapped with their average coordinates
async function getPositions(document) {
    const annotation = await readText(document);

    const wordsWithPositions = [];
    // store words with coordinates
    for (const pages of annotation.pages) {
        for (const blocks of pages.blocks) {
            for (const paragraph of blocks.paragraphs) {
                for (const word of paragraph.words){
                    const wordText = word.symbols.map(s => s.text).join('');

                    // get average y value for vertical sorting
                    const y = word.boundingBox.vertices.map(v => v.y);
                    const avgY = y.reduce((a, b) => a + b, 0) / y.length;
                    
                    // get average x value for horizontal sorting
                    const x = word.boundingBox.vertices.map(v => v.x);
                    const avgX = x.reduce((a, b) => a + b, 0) / x.length;

                    // push words with positions
                    wordsWithPositions.push({text: wordText, x: avgX, y: avgY})
                }
            }
        }
    }
    return wordsWithPositions;
}

module.exports = { getPositions }