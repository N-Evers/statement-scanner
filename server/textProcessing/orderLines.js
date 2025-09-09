// Sort words in line by their average x coordinate
async function orderLines(lines) {
    const orderedLines = [];
    for (const line of lines) {
            line.sort((a, b) => a.x - b.x);
            const onlyText = line.map(word => word.text);

            orderedLines.push(onlyText.join(' '));
        }
    return orderedLines.join(' ');
}

module.exports = { orderLines };