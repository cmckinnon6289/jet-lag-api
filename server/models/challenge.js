const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    tokens: {
        type: Number,
        required: true
    },
    canActive: {
        type: Boolean,
        required: true
    },
    canVeto: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Challenge = mongoose.model('Challenge', cardSchema);

module.exports = Challenge;