import mongoose from "mongoose";

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

const Curse = mongoose.model('Curse', cardSchema);

module.exports = Curse;