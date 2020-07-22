console.log(`Connected`);

const newMatch = new gameMatch(player1, player2);
let currentPlayer = player1;

function gameStart() {
    console.log(`A new match has begun`);
    // const newMatch = new gameMatch(player1, player2);
    // return newMatch;
}

function drawCard() {
    // let newCardSpot;
    // let newCardAttr;
    // let newcardInGame;
    // let newCardAtk;
    // let newCardDef;
    // let newCardTuC;
    console.log(`Drawing card`);
    let playerDeck = event.target.classList;
    console.log(playerDeck);

    if (playerDeck[1] === `p1` && player1.playerTurn === true) {
        newMatch.drawCard(player1);
        displayCards(player1, `in-hand-area`, `cards-in-hand`);
        player1.playerTurn = false;
        // player2.playerTurn = true;
    }
    else if (playerDeck[1] === `p2` && player2.playerTurn === true) {
        newMatch.drawCard(player2);
        displayCards(player2, `in-hand-area`, `cards-in-hand`);
        player2.playerTurn = false;
        // player1.playerTurn = true;
    }

    // document.querySelectorAll(`.cards-in-hand`).forEach((card) => {card.addEventListener(`click`, cardsInHand)});
    document.querySelectorAll(`.cards-in-hand`).forEach((card) => {card.addEventListener(`dblclick`, playCard)});
}

function displayCards(playerDisplay,cardArea, cardClass) {
    let cardsAlreadyDisplayed = document.querySelector(`.${cardArea}.${playerDisplay.shortName}`).childNodes;
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
        newcardInGame.classList.add(`${cardClass}`);
        newcardInGame.setAttribute(`id`, card.cardID);
        document.querySelector(`.${cardArea}.${playerDisplay.shortName}`).appendChild(newcardInGame);
    
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

// function cardsInHand() {
//     console.log(`Card in hand`)
//     console.log(event.target);
// }

function playCard() {
    console.log(`Play card`);
    console.log(event.target.id);
    let cardToPlay = currentPlayer.cardInGame.find((card) => {
        return card.cardID === event.target.id;
    });
    cardToPlay.status = `in-play`;
    let inHandGone = document.getElementById(`${event.target.id}`)
    inHandGone.remove();
    displayCards(currentPlayer, `in-play-area`, `in-play`)
    document.querySelectorAll(`.in-play`).forEach((card) => {card.addEventListener(`dblclick`, attackCard)});
}

function attackCard() {
        console.log(`Card to attack with`)
        console.log(event.target);
    }

// End turn function, toggles player turns by updating the player object
// so that the other player's turn value is true
function endTurn() {
    console.log(`Ending Turn`);
    let turnEnd = event.target.classList;
    console.log(turnEnd);

    if (turnEnd[1] === `p1`) {
        // player1.playerTurn = false;
        // need to loop through player cards and increment their turn value
        currentPlayer = player2;
        player2.playerTurn = true;
    }
    else if (turnEnd[1] === `p2`) {
        // player2.playerTurn = false;
        currentPlayer = player1;
        player1.playerTurn = true;
    }
}
// END OF End turn function

// Load scripts after page is ready
window.onload = function() {
    document.querySelectorAll(`.shuffled-deck`).forEach((deck) => {deck.addEventListener(`click`, drawCard)});
    document.querySelectorAll(`.end-turn`).forEach((ending) => {ending.addEventListener(`click`, endTurn)})
    gameStart();
}
// END OF Load scripts after page is ready