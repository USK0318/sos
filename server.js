const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mongoose = require('mongoose');
const uri = "mongodb+srv://uppalapatisaikiran27:VCDTQOLxH6Cp68JY@cluster0.etnhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use(fileUpload({
    limits: { fileSize: 8 * 1024 * 1024 },
}));

const deleteFile = async (oldImagePath) => {
    try {
        console.log('sai',__dirname);
        const fullPath = path.join(__dirname, oldImagePath);
        console.log(fullPath);
        if (fs.existsSync(fullPath)) {
            fs.unlink(fullPath, (err) => {
                if (err) {
                    console.error(`Error deleting old image: ${err}`);
                } else {
                    console.log(`Successfully deleted old image: ${fullPath}`);
                }
            });
        } else {
            console.error(`Old image file does not exist: ${fullPath}`);
        }
    }
    catch (error) {
        console.error(`Error deleting old image: ${error}`);
    }
};

const handleFileUpload = async (file, destination) => {
    if (!file) return null;
    const extension = path.extname(file.name);
    const filename = `${Date.now()}${extension}`;
    const uploadPath = path.join(__dirname, "uploads", destination, filename);
    try {
        await file.mv(uploadPath);
        console.log(`File uploaded to ${uploadPath}`);
        return `/uploads/${destination}/${filename}`;
    } catch (err) {
        console.error(`Error uploading file: ${err}`);
        return null;
    }
};


const Schema = mongoose.Schema;
const dataTransferSchema = new Schema({
    code: Number,
    file: String
});

const DataTransfer = mongoose.model('DataTransfer', dataTransferSchema);



app.get('/', (req, res) => {
    res.send('Hello !');
});

app.post('/post', async (req, res) => {
    try {
        // Check if file is present
        if (!req.files || !req.files.filex) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filea = req.files.filex; // Retrieve the file

        // Generate a unique code
        let code;
        let isUnique = false;
        while (!isUnique) {
            code = Math.floor(1000 + Math.random() * 9000);
            const existingData = await DataTransfer.findOne({ code });
            if (!existingData) {
                isUnique = true;
            }
        }
        // Handle file upload
        const fileUrl = await handleFileUpload(filea, 'files');
        if (!fileUrl) {
            return res.status(500).json({ message: 'File upload failed sai', fileUrl });
        }
        // Save data to MongoDB
        const data = new DataTransfer({ code, file: fileUrl });
        await data.save();

        return res.status(200).json({ code });
    } catch (error) {
        console.error(`Error processing POST request: ${error}`);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



app.get('/get/:code', async (req, res) => {
    const code = req.params.code;
    try {
        const data = await DataTransfer.findOne({ code: code });
        if (!data) {
            return res.status(404).json({ message: 'Your Data is not found' });
        }
        res.status(200).json(data);

        setTimeout(async () => {
            try {
                await deleteFile(data.file);
                await DataTransfer.deleteOne({ code: code });
                console.log(`Data deleted for code: ${code}`);
            } catch (error) {
                console.error(`Error during delayed deletion: ${error}`);
            }
        }, 10000);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(8001, () => {
    console.log('Server is running on http://localhost:8001');
});