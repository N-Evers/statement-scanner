const express = require('express');
const cors = require('cors');
const { processDocument } = require('./textProcessing/index');
const path = require('path');


const app = express();
app.use(cors());

app.get('/process/:file', async (req, res) => {
    try {
        const docuemntPath = path.join(__dirname, 'documents', req.params.file);
        const result = await processDocument(documentPath);

        const text = result.join(' ');
        res.send(text);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => console.log('Server is running on pport 3001'));