import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started port ${PORT}`))

app.use(express.json());

app.get('/', (req,res) => res.send('hello. get off the API page.'))

const CARDS = [
    {
        tokens: 1,
        canActive: true,
        canVeto: true,
        name: "Your city!",
        description: "Report 3 safety concerns (potholes, broken traffic lights, etc) to 311. You must report each concern in separate calls. Alternatively, remove 10 pieces of litter from  a park. The litter does not all have to be from the same park."
    }
]

const CURSES = [
    {
        tokens: 0,
        canActive: false,
        canVeto: false,
        name: "Blackout",
        description: "Neither teammate may use a phone to research public transit routes for the remainder of the game. This card cannot be vetoed."
    }
]

app.get('/api/assets/curses', (req, res) => {
    res.send(CURSES);
})

app.get('/api/assets/challenges', (req, res) => {
    res.send(CARDS);
})

app.post('/api/new-card', (req, res) => {
    const newCard = {
        tokens: req.body.tokens,
        canActive: req.body.canActive,
        canVeto: req.body.canVeto,
        name: req.body.name,
        description: req.body.description
    }

    let push = "challenge"

    if (req.body.type = 1) { CURSES.push(newCard); push = "curse" }
    else CARDS.push(newCard);
    res.send(`added a new ${push} card`)
})

function parseCardType(num) {
    let total = CARDS.length + CURSES.length
    if (Math.round(num*total) > CARDS.length) {
        return 0;
    } return 1;
}