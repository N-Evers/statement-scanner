const express = require('express');
const cors = require('cors');
const { processDocument } = require('./textProcessing/index');
const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "documents/"),
    filename: (req, file, cb) => cb(null, file.originalname)
})
const upload = multer({ storage });


const app = express();
app.use(cors());

// post selected file to backend
app.post('/documents', upload.single("file"), async (req, res) => {
    try {
        const filePath = path.join(__dirname, "documents", req.file.originalname);

        console.log("uploaded file path:", filePath);

        // call google vision OCR
        const textAnnotation = await processDocument(filePath);

        // send extracted text back
        res.json({
            filename: req.file.originalname,
            text: textAnnotation ? textAnnotation : "",
        });
    } catch (err) {
        console.error("Proccessing failed: ", err);
        res.status(500).json({ error: err.message });
    }
})

/*
app.get('/process/:file', async (req, res) => {
    try {
        const documentPath = path.join(__dirname, '..', 'documents', req.params.file);
        const result = await processDocument(documentPath);

        res.send(result);
    } catch (err) {
        console.error("Processing failed: ", err);
        res.status(500).json({ error: err.message });
    }
});
*/
app.listen(3001, () => console.log('Server is running on pport 3001'));