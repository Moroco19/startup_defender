console.log(`Connected`);

const newMatch = new gameMatch(player1, player2);

function gameStart() {
    console.log(`A new match has begun`);
    // const newMatch = new gameMatch(player1, player2);
    // return newMatch;
}

function drawCard() {
    let newCardSpot;
    let newCardAttr;
    let newcardInGame;
    let newCardAtk;
    let newCardDef;
    let newCardTuC;
    console.log(`Drawing card`);
    let playerDeck = event.target.classList;
    console.log(playerDeck);

    if (playerDeck[1] === `p1`) {
        newMatch.drawCard(player1);
        displayCards(player1);
    }
    else if (playerDeck[1] === `p2`) {
        newMatch.drawCard(player2);
        displayCards(player2);
    }

    document.querySelectorAll(`.cards-in-hand`).forEach((card) => {card.addEventListener(`click`, cardsInHand)});
    document.querySelectorAll(`.cards-in-hand`).forEach((card) => {card.addEventListener(`dblclick`, playCard)});
}

function displayCards(playerDisplay) {
    let cardsAlreadyDisplayed = document.querySelector(`.in-hand-area.${playerDisplay.shortName}`).childNodes;
    cardsAlreadyDisplayed.forEach((cardDisplayed) => {
        while (cardDisplayed.parentNode.firstElementChild) {
            cardDisplayed.parentNode.removeChild(cardDisplayed.parentNode.firstElementChild);
        }
    });
    let newcardInGame;
    let newCardAtk;
    let newCardDef;
    let newCardTuC;

    playerDisplay.cardInGame.forEach((card) => {
        newcardInGame = document.createElement(`div`);
        newcardInGame.classList.add(`cards-in-hand`);
        document.querySelector(`.in-hand-area.${playerDisplay.shortName}`).appendChild(newcardInGame);
    
        newCardAtk = document.createElement(`div`);
        newCardAtk.innerText = card.turnAtk;
        newCardAtk.classList.add(`card-atk`);
        newcardInGame.appendChild(newCardAtk);
    
        newCardDef = document.createElement(`div`);
        newCardDef.innerText = card.turnDef;
        newCardDef.classList.add(`card-def`);
        newcardInGame.appendChild(newCardDef);
    
        newCardTuC = document.createElement(`div`);
        newCardTuC.innerText = card.turnCost;
        newCardTuC.classList.add(`card-tuc`);
        newcardInGame.appendChild(newCardTuC);
    });
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