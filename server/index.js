const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();

app.use(bodyParser.json());
app.use(cors());

require('./db')
const Challenge = require('./models/Challenge')
const Curse = require('./models/Curse')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started port ${PORT}`))


app.get('/', (req,res) => res.send('hello. get off the API page.'))

app.get('/api/assets/curses', async (req, res) => {
    try {
        const curses = await Curse.find({});
        res.json(curses);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/assets/challenges', async (req, res) => {
    try {
        const challenges = await Challenge.find({});
        res.json(challenges);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
})