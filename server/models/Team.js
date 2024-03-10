const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    balance: {
        type: Number,
        min: 0,
        required: true
    },
    districts: {
        type: Array,
        required: true
    },
    deck: {
        type: Array,
        required: true
    }
}, { collection: 'team_data' })

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;