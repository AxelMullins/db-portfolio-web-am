const mongoose = require('mongoose');
const { Schema } = mongoose;

const experienceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    technologies: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    details: {
        type: Array,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Experiencia = mongoose.model('Experiencia', experienceSchema);
module.exports = {Experiencia}