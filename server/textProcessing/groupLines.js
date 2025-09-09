// Sort words by their average y coordinate with a tolerance of 5 pixels
async function groupLines(wordMap, tolerance = 5) {
    wordMap.sort((a, b) => a.y - b.y);

    const lines = [];
    let currentLine = [];
    let currentY = null;
    
    for (const word of wordMap) {
        if (currentLine == null || Math.abs(currentY - word.y) <= tolerance) {
            currentLine.push(word);
            currentY = currentY == null ? word.y : currentY;
        } else {
            lines.push(currentLine);
            currentLine = [word];
            currentY = word.y;
        }
    }
    // push last line if not empty
    if (currentLine.length > 0) lines.push(currentLine);

    return lines;

}

module.exports = { groupLines };