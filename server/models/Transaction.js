// models/User.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    team: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
}, { collection: 'transactions' });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction