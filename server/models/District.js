// models/User.js
const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    districtID: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    team: Object
}, { collection: 'districts' });

const District = mongoose.model('District', districtSchema);
module.exports = District