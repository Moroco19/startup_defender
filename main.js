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
        player1.playerTurn = false;
    }
    else if (playerDeck[1] === `p2` && player2.playerTurn === true) {
        newMatch.drawCard(player2);
        player2.playerTurn = false;
    }

    document.querySelectorAll(`.in-hand`).forEach((card) => {card.addEventListener(`dblclick`, playCard)});
}

function playCard() {
    console.log(`Play card`);
    console.log(event.target.id);
    newMatch.playSelectedCard(currentPlayer, event.target.id);
    document.querySelectorAll(`.in-play`).forEach((card) => {card.addEventListener(`click`, attackCard)});
}

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
            // console.log(fighter);
            // console.log(fightStorer.selectedCards[0]);
            // console.log(defender);
            // console.log(fightStorer.selectedCards[1]);
            newMatch.attack(fighter, fightStorer.selectedCards[0], defender, fightStorer.selectedCards[1]);
        }
        // fightStorer.selectedCards = [];
        // attackObj.push....
        // if (attackObj.length === 2) {
        //     attackObj[1] - attackObj[0];
        // }
        displayHealth();
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

function displayHealth() {
    document.querySelector(`.player-hp.p1`).innerHTML = player1.matchHp;
    document.querySelector(`.player-hp.p2`).innerText = player2.matchHp;
}

// Load scripts after page is ready
window.onload = function() {
    document.querySelectorAll(`.shuffled-deck`).forEach((deck) => {deck.addEventListener(`click`, drawCard)});
    document.querySelectorAll(`.end-turn`).forEach((ending) => {ending.addEventListener(`click`, endTurn)})
    displayHealth();
    gameStart();
}
// END OF Load scripts after page is ready