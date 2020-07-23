console.log(`Connected`);

const newMatch = new gameMatch(player1, player2);
let currentPlayer = player1;

function gameStart() {
    console.log(`A new match has begun`);
}

// Draw card function allows the player to draw a single random card per turn
function drawCard() {
    console.log(`Drawing card`);
    let playerDeck = event.target.classList;
    console.log(playerDeck);

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
    console.log(event.target.id);
    newMatch.playSelectedCard(currentPlayer, event.target.id);
    document.querySelectorAll(`.in-play`).forEach((card) => {card.addEventListener(`click`, attackCard)});
}
// END OF Play card function

// Card attack function
function attackCard() {
        console.log(`Card to attack with`)
        console.log(event.target);
        console.log(event.target.parentNode.classList[1]);
        let playerChosenCard;
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
        let cardFight = playerChosenCard.cardInGame.find(card => card.cardID === event.target.id) 
        console.log(cardFight)
        fightStorer.selectedCards.push(cardFight)
        if (fightStorer.selectedCards.length === 2) {
            newMatch.attack(fighter, fightStorer.selectedCards[0], defender, fightStorer.selectedCards[1]);
        }
    }
// END OF Card attack function 

// End turn function, toggles player turns by updating the player object
// so that the other player's turn value is true, and switches the current player
// variable's value to the other player
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

// Health Display function that pulls player health from player object and displays in the DOM
function displayHealth() {
    document.querySelector(`.player-hp.p1`).innerText = player1.matchHp;
    document.querySelector(`.player-hp.p2`).innerText = player2.matchHp;
}
// END OF Health Display function

// Load scripts after page is ready
window.onload = function() {
    document.querySelectorAll(`.shuffled-deck`).forEach((deck) => {deck.addEventListener(`click`, drawCard)});
    document.querySelectorAll(`.end-turn`).forEach((ending) => {ending.addEventListener(`click`, endTurn)})
    displayHealth();
    gameStart();
}
// END OF Load scripts after page is ready