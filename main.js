console.log(`Connected`);

class cardGenerator {
    constructor(attack, defense, turnCost) {
        this.attack = attack;
        this.defense = defense;
        this.turnCost = turnCost;
        this.status = `in-hand`;
        this.turnAtk = this.attack
        this.turnDef = this.defense
    }
}

const player1 = {
    cardInHand: [],
    cardInPlay: [],
    cardInDiscard: [],
}
const player2 = {
    cardInHand: [],
    cardInPlay: [],
    cardInDiscard: [],
}

function gameStart() {
    console.log(`A new match has begun`);
}

function drawCard() {
    console.log(`Drawing card`);
    let playerDeck = event.target.classList;
    newAtk = Math.floor(Math.random() * 11);
    newDef = Math.floor(Math.random() * 11);
    newTuC = Math.ceil(Math.random() * 5);
    let newCard = new cardGenerator(newAtk, newDef, newTuC);
    if (playerDeck[1] === `p1`) {
        player1.cardInHand.push(newCard);
        let newCardInHand = document.createElement(`div`);
        newCardInHand.classList.add(`cards-in-hand`);
        document.querySelector(`.in-hand-area.p1`).appendChild(newCardInHand);

    }
    else if (playerDeck[1] === `p2`) {
        player2.cardInHand.push(newCard);
        let newCardInHand = document.createElement(`div`);
        newCardInHand.classList.add(`cards-in-hand`);
        document.querySelector(`.in-hand-area.p2`).appendChild(newCardInHand);
    }
    document.querySelectorAll(`.cards-in-hand`).forEach((card) => {card.addEventListener(`click`, cardsInHand)});
    document.querySelectorAll(`.cards-in-hand`).forEach((card) => {card.addEventListener(`dblclick`, playCard)});
}

function cardsInHand() {
    console.log(`Card in hand`)
    console.log(event.target);
}

function playCard() {
    console.log(`Play card`);
    console.log(event.target);
}

// Load scripts after page is ready
window.onload = function() {
    document.querySelectorAll(`.shuffled-deck`).forEach((deck) => {deck.addEventListener(`click`, drawCard)});
    
    gameStart();
}
// END OF Load scripts after page is ready