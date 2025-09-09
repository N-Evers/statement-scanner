const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

async function readText(document) {
    const [result] = await client.textDetection(document);
    return result.fullTextAnnotation;
}

module.exports = { readText };
