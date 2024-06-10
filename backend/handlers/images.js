const Image = require('../dataModels/images');

async function getImages(req, res) {
    try {
        const images = await Image.find();
        res.json(images);
    }
    catch {
        res.json({ message: 'Error getting images' });
    }
}

async function uploadImage(req, res) {
    const { myFile } = req.body;
    try {
        const newImage = new Image({ myFile });
        newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully' });
    }
    catch {
        res.json({ message: 'Error uploading image' });
    }
}

module.exports = { getImages, uploadImage };