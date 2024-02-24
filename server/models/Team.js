const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    claimed: {
        type: Array,
        required: true
    }
}, { collection: 'team_data' })

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;