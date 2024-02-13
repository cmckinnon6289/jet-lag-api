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
    },
    {
        challenge: "hi"
    },
    {
        challenge: "hello"
    },
    {
        challenge: ":)"
    },
    {
        challenge: "be happy"
    },
    {
        challenge: "be grateful you have all these wonderful things"
    },
    {
        challenge: "be grateful you have all these wonderful people in your life :)"
    }
]

const CURSES = [
    {
        tokens: 0,
        canActive: false,
        canVeto: false,
        name: "Blackout",
        description: "Neither teammate may use a phone to research public transit routes for the remainder of the game. This card cannot be vetoed."
    },
    {
        curse: "hi"
    },
    {
        curse: "hello"
    },
    {
        curse: ":)"
    }
]

const deckLen = CARDS.length + CURSES.length;

app.get('/api/assets/curses', (req, res) => {
    res.send(CURSES);
})

app.get('/api/assets/challenges', (req, res) => {
    res.send(CARDS);
})

app.get('/api/get-card', (req, res) => {
    let card;
    let num = Math.round(Math.random()*deckLen);
    if (num >= CARDS.length) {
        num -= CARDS.length;
        card = CURSES[num];
    } else {
        card = CARDS[num];
    }
    res.send(card ? card : "nothing found");
})

app.post('/api/new-card', (req, res) => {
    const newCard = {
        tokens: req.body.tokens,
        canActive: req.body.canActive,
        canVeto: req.body.canVeto,
        name: req.body.name,
        description: req.body.description
    }

    let push;

    if (req.body.type = 1) { 
        CURSES.push(newCard)
        push = "curse";
    }
    else {
        CARDS.push(newCard)
        push = "challenge";
    };
    res.send(`for type ${type}, added a new ${push} card`)
})