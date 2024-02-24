const mongoose = require("mongoose");
// dw ab this comment. i just need git to recognise that i made a change to the file name.

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
    },
    vetoPeriod: {
        type: Number
    }
}, { collection: 'curses' })

const Curse = mongoose.model('Curse', cardSchema);

module.exports = Curse;
