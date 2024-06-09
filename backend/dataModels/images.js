const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    myFile : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Image', imageSchema, 'images');