console.log(`Connected`);

let newMatch = new gameMatch(player1, player2);
let currentPlayer = player1;
let playerDisplay = document.querySelector(`.current-player`);
playerDisplay.innerText = `It is ${currentPlayer.name}'s turn`;

function gameStart() {
    console.log(`A new match has begun`);
    displayHealth();
    displayTurnCurrency();
}

// Draw card function allows the player to draw a single random card per turn
function drawCard() {
    // console.log(`Drawing card`);
    let playerDeck = event.target.classList;
    // console.log(playerDeck);

    if (playerDeck[1] === `p1` && player1.playerTurn === true) {
        newMatch.drawCard(player1);
        player1.playerTurn = false;
    }
    else if (playerDeck[1] === `p2` && player2.playerTurn === true) {
        newMatch.drawCard(player2);
        player2.playerTurn = false;
    }

    document.querySelectorAll(`.in-hand`).forEach((card) => {card.addEventListener(`dblclick`, playCard)});
}
// END OF Draw card function

// Play card function moves the selected card into the play area so it can
// be used in the game for attack or defense
function playCard() {
    console.log(`Play card`);
    // console.log(event.target.id);
    newMatch.playSelectedCard(currentPlayer, event.target.id);
    document.querySelectorAll(`.in-play`).forEach((card) => {card.addEventListener(`click`, attack)});
}
// END OF Play card function

// Card attack function
function attack() {
        console.log(`Card to attack with`)
        if (fightStorer.selectedCards.length > 2) {
            fightStorer.selectedCards = [];
        }
        // console.log(event.target);
        // console.log(event.target.parentNode.classList[1]);
        let playerChosenCard;
        let cardFight;
        let fighter;
        let defender;
        if (currentPlayer === player1) {
            fighter = player1;
            defender = player2;
        }
        else {
            fighter = player2;
            defender = player1;
        }
        switch(event.target.parentNode.classList[1]) {
            case `p1`: playerChosenCard = player1 ; break;
            case `p2`: playerChosenCard = player2 ; break;
        }
        if (event.target.classList[0] === `player-hp` && currentPlayer.shortName !== event.target.parentNode.classList[1]) {
            cardFight = {
                noCards: `No Cards`,
            }
        }
        else {
            cardFight = playerChosenCard.cardInGame.find(card => card.cardID === event.target.id) 
            console.log(`cardFight object: `, cardFight)
        }   
        fightStorer.selectedCards.push(cardFight)
        if (cardFight.turns === 0) {
            console.log(`Cannot attack with a card in the same turn that it was drawn or a card that has already been used this turn.`);
            fightStorer.selectedCards = [];
        }
        else if (fightStorer.selectedCards.length > 1 && fightStorer.selectedCards[0].domElement.classList[1] === event.target.parentNode.classList[1]) {
            console.log(`Cannot attack own cards, try again`);
            fightStorer.selectedCards = [];
        }
        else {
            if (fightStorer.selectedCards.length === 2) {
                newMatch.attack(fighter, fightStorer.selectedCards[0], defender, fightStorer.selectedCards[1]);
            }
        }
    }
// END OF Card attack function 

// End turn function, toggles player turns by updating the player object
// so that the other player's turn value is true, and switches the current player
// variable's value to the other player
function endTurn() {
    console.log(`Ending Turn`);
    let turnEnd = event.target.classList;
    // console.log(turnEnd);
    // let turnCurrenyVar1 = player1.turnCurrency - player2.turnCurrency <= 1;
    // let turnCurrenyVar2 = player1.turnCurrency - player2.turnCurrency >= 0;
    if ((player1.turnCurrency - player2.turnCurrency <= 1) && (player1.turnCurrency - player2.turnCurrency >= 0)) {
        if (turnEnd[1] === `p1` && player2.playerTurn === false) {
            newMatch.turnEndCounters(player1);
            currentPlayer = player2;
            player2.playerTurn = true;
        }
        else if (turnEnd[1] === `p2` && player1.playerTurn === false) {
            newMatch.turnEndCounters(player2);
            currentPlayer = player1;
            player1.playerTurn = true;
        }
    }
    playerDisplay.innerText = `It is ${currentPlayer.name}'s turn`;
}
// END OF End turn function

// Health Display function that pulls player health from player object and displays in the DOM
function displayHealth() {
    document.querySelector(`.player-hp.p1`).innerText = player1.matchHp;
    document.querySelector(`.player-hp.p2`).innerText = player2.matchHp;
}
// END OF Health Display function

// Turn Currency Display function that allows the player to compare against cards in hand to see
// which cards they can place
function displayTurnCurrency() {
    document.querySelector(`.turn-currency.p1`).innerText = player1.turnCurrency;
    document.querySelector(`.turn-currency.p2`).innerText = player2.turnCurrency;
}
//END OF Turn Currency Display function 

// Load scripts after page is ready
window.onload = function() {
    document.querySelectorAll(`.shuffled-deck`).forEach((deck) => {deck.addEventListener(`click`, drawCard)});
    document.querySelectorAll(`.end-turn`).forEach((ending) => {ending.addEventListener(`click`, endTurn)});
    document.querySelectorAll(`.player-hp`).forEach((area) => {area.addEventListener(`click`, attack)});
    gameStart();
}
// END OF Load scripts after page is ready