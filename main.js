console.log(`Connected`);

class cardGenerator {
    constructor(attack, defense, turnCost) {
        this.attack = attack;
        this.defense = defense;
        this.turnCost = turnCost;
    }
}

const player1 = {
    cardInHand: [],
}
const player2 = {
    cardInHand: [],
}

function gameStart() {
    console.log(`A new match has begun`);
}

function drawCard() {
    console.log(`Drawing card`);
    let playerDeck = event.target.classList;
    newAtk = Math.floor(Math.random() * 11)
    newDef = Math.floor(Math.random() * 11)
    newTuC = Math.ceil(Math.random() * 5)
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
}

// Load scripts after page is ready
window.onload = function() {
    document.querySelectorAll(`.shuffled-deck`).forEach((deck) => {deck.addEventListener(`click`, drawCard)});
    gameStart();
}
// END OF Load scripts after page is ready