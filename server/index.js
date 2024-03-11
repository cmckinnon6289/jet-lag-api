const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

require('./db')
const Card = require('./models/Card');
const Team = require('./models/Team');
const User = require('./models/User');
const District = require('./models/District');

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

app.get('/api/internal/assets/cards', async (req, res) => {
    try {
        const cards = await Card.find({});
        res.json(cards);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get('/api/internal/assets/teams', async (req,res) => {
    try {
        const teams = await Team.find({});
        res.json(teams);
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

app.get('/api/internal/assets/districts/:id', async(req,res) => {
    try {
        const district = await District.findOne({ districtID: req.params.id });
        if (!district) return res.status(404).json({ error: `district with ID ${req.params.id} not found.` });
        res.status(200).json(district);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/api/internal/new-challenge', async (req, res) => {
    try {
        const newChallenge = new Card({
            type: 0,
            name: req.body.name,
            description: req.body.description,
            tokens: req.body.tokens,
            canActive: req.body.canActive,
            canVeto: req.body.canVeto            
        })
        await newChallenge.save()
        res.status(201).json({ response: "successfully pushed your new challenge to the database!" })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/api/internal/new-curse', async (req, res) => {
    try {
        const newCurse = new Card({
            type: 1,
            name: req.body.name,
            description: req.body.description,
            tokens: req.body.tokens,
            canActive: req.body.canActive,
            canVeto: req.body.canVeto            
        })
        await newCurse.save()
        res.status(201).json({ response: "successfully pushed your new curse to the database!" })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/api/internal/new-team', async(req, res) => {
    try {
        const newTeam = new Team({
            name: req.body.name,
            balance: req.body.balance,
            districts: req.body.districts ? req.body.districts : [],
            deck: req.body.deck ? req.body.deck : []
        })
        if (await(Team.findOne({name: req.body.name}))) {
            return res.status(400).json({ error: `team with name ${req.body.name} already exists.` })
        }
        const doc = await newTeam.save()
        try {
            fetch(`${process.env.NEW_TEAM_WEBHOOK}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `new team created with id ${doc._id}. check team_data cluster.`
                })
            })
        } catch (err) {
            return res.status(201).json({ response: `successfully created team with id ${doc._id}.`, error: `could not fire discord webhook. reason: ${err.message}` });
        }
        res.status(201).json({ response: `successfully created team with id ${doc._id}` })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

app.delete('/api/internal/delete-team', async(req, res) => {
    try {
        await Team.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: `successfully deleted team with id ${req.body.id}!` })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

/*

TEAM DATA API BELOW. BE CAUTIOUS WHEN EDITING.

*/

app.patch('/api/teams/update', async(req, res) => {
    try {
        const team = await Team.findById(req.body.id);
        if (!team) return res.status(404).json({ uhOh: `team with id ${req.body.id} not found. try again.` })
        for (const property in req.body.update) {
            team[property] = req.body.update[property];
        }
        team.save()
        res.status(200).json({ update: "successfully updated the team!", updatedTeam: team});
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

app.get('/api/teams/draw-card', async(req, res) => {
    try {
        const allCards = await Card.find({});
        const rand = Math.floor(Math.random()*allCards.length)
        const card = allCards[rand]

        res.json(card);
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/api/teams/claim-district/:id', async(req,res) => {
    try {
        const district = await District.findOne({ districtID: req.params.id });
        if (!district) res.status(404).json({ error: `district with ID ${req.params.id} not found.` });
        else if (district.team) res.status(423).json({ error: `district with ID ${req.params.id} already claimed by ${district.team.name}.` })
        else {
            //TODO: get team from session ID.
            //TODO: add team to district object.
            res.status(200).json({ success: `congratulations! you have officially claimed the district #${req.params.id}: ${district.name}.` })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get('/api/teams/get/:id', async(req, res) => {
    try {
        const target = await Team.findById(req.params.id);
        res.json(target);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})