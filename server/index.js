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
const Team = require('./models/Team')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started port ${PORT}`))


app.get('/', (req,res) => res.send('hello. get off the API page.'))

app.get('/api/test', (req, res) => {
    try {
        res.send({response: "the API is working!"})
    } catch(err) {
        res.status(503).json({ error: "server isn't responding or you are so royally bad at doing API calls that you have managed to fuck up the test call. either way, lmao glhf." })
    }
})

/*

INTERNAL APIS BELOW.

*/

app.get('/api/internalassets/curses', async (req, res) => {
    try {
        const curses = await Curse.find({});
        res.json(curses);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/internal/assets/challenges', async (req, res) => {
    try {
        const challenges = await Challenge.find({});
        res.json(challenges);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
})

app.post('/api/internal/new-challenge', async (req, res) => {
    try {
        const newChallenge = new Challenge({
            name: req.body.name,
            description: req.body.description,
            tokens: req.body.tokens,
            canActive: req.body.canActive,
            canVeto: req.body.canVeto            
        })
        await newChallenge.save()
        res.status(200).json({ response: "successfully pushed your new challenge to the database!" })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/api/internal/new-curse', async (req, res) => {
    try {
        const newCurse = new Curse({
            name: req.body.name,
            description: req.body.description,
            tokens: req.body.tokens,
            canActive: req.body.canActive,
            canVeto: req.body.canVeto            
        })
        await newCurse.save()
        res.status(200).json({ response: "successfully pushed your new curse to the database!" })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

/*

TEAM DATA API BELOW. BE CAUTIOUS WHEN EDITING.

*/

app.patch('/api/teams/update', async(req, res) => {
    try {
        const team = await Team.find(t => t.id === parseInt(req.body.id))
        if (!team) return res.status(404).json({ uhOh: `team with id ${req.body.id} not found. try again.` })

        
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

app.get('/api/teams/draw-challenge', async(req, res) => {
    try {
        //TODO: implement active card check

        const allCards = await Challenge.find({});
        const rand = Math.round(Math.random()*allCards.length)
        const card = allCards[rand]
        res.json(card);
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})