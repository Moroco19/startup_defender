class gameMatch {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    drawCard(chosenPlayer) {
        console.log(`Drawing card`);
        let playerTurn = chosenPlayer;
        let newAtk = Math.floor(Math.random() * 11);
        let newDef = Math.floor(Math.random() * 11);
        let newTuC = Math.ceil(Math.random() * 5);
        let newCard = new cardGenerator(newAtk, newDef, newTuC);
        // Maybe turn the newAtk/Def/TuC variables into their own object ?
        playerTurn.cardInGame.push(newCard);
        
        const newcardInGame = document.createElement(`div`);
        newcardInGame.classList.add(`${newCard.status}`);
        newcardInGame.setAttribute(`id`, newCard.cardID);
        document.querySelector(`.in-hand-area.${chosenPlayer.shortName}`).appendChild(newcardInGame);
        
        const newCardAtk = document.createElement(`div`);
        newCardAtk.innerText = newCard.turnAtk;
        newCardAtk.classList.add(`card-atk`);
        newcardInGame.appendChild(newCardAtk);
            
        const newCardDef = document.createElement(`div`);
        newCardDef.innerText = newCard.turnDef;
        newCardDef.classList.add(`card-def`);
        newcardInGame.appendChild(newCardDef);
            
        const newCardTuC = document.createElement(`div`);
        newCardTuC.innerText = newCard.turnCost;
        newCardTuC.classList.add(`card-tuc`);
        newcardInGame.appendChild(newCardTuC);

        newCard.domElement = newcardInGame;
    }

    playSelectedCard(chosenPlayer, chosenCard) {
        let cardObj = chosenPlayer.cardInGame.find(card => card.cardID === chosenCard)
        // console.log(cardObj);
        cardObj.status = `in-play`;
        cardObj.domElement.className = `in-play`;
        // console.log(cardObj);
        const inPlayArea = document.querySelector(`.in-play-area.${chosenPlayer.shortName}`);
        inPlayArea.appendChild(cardObj.domElement);
    }

    attack(attackingPlayer, attackingCard, defendingPlayer, defendingCard) {
        // let remainingCards;
        let atkRemainingDef = (parseInt(attackingCard.domElement.childNodes[1].innerText) - parseInt(defendingCard.domElement.childNodes[0].innerText));
        let defRemainingDef = (parseInt(defendingCard.domElement.childNodes[1].innerText) - parseInt(attackingCard.domElement.childNodes[0].innerText));
        console.log(`Attacking card's remaining defense ${atkRemainingDef}`);
        console.log(`Defending card's remaining defense ${defRemainingDef}`);

        attackingCard.domElement.childNodes[1].innerText = atkRemainingDef;
        defendingCard.domElement.childNodes[1].innerText = defRemainingDef;

        if (atkRemainingDef <= 0) {
            attackingCard.status = `in-discard`;
            // remainingCards = attackingPlayer.cardInGame.filter(card => card.status === `in-play`);
            const inDiscardArea = document.querySelector(`.discard-pile.${attackingPlayer.shortName}`)
            inDiscardArea.appendChild(attackingCard.domElement);
            attackingCard.domElement.className = `in-discard`;
            attackingCard.domElement.style.display = `none`;
            // if (remainingCards.length === 0) {
                this.playerMatchHealth(attackingPlayer, atkRemainingDef);
            // }
        }
        if (defRemainingDef <= 0) {
            defendingCard.status = `in-discard`;
            // remainingCards = defendingPlayer.cardInGame.filter(card => card.status === `in-play`);
            const inDiscardArea = document.querySelector(`.discard-pile.${defendingPlayer.shortName}`)
            inDiscardArea.appendChild(defendingCard.domElement);
            defendingCard.domElement.className = `in-discard`;
            defendingCard.domElement.style.display = `none`;
            // if (remainingCards.length === 0) {
            this.playerMatchHealth(defendingPlayer, defRemainingDef);
            // }
        }
        console.log(`Player 1 cards`, player1)
        console.log(`Player 2 cards`, player2)
        fightStorer.selectedCards = [];
        this.matchEnd();
    }

    playerMatchHealth(thePlayer, healthReduction) {
        thePlayer.matchHp += healthReduction;
        displayHealth();
    }

    matchEnd() {
        if (player1.matchHp <= 0 && player2.matchHp <= 0) {
            console.log(`Its a tie!`);
            alert(`Its a tie!`);
        }
        else if (player1.matchHp <= 0 ) {
            console.log(`Player 2 wins!`);
            alert(`Player 2 wins!`);
        }
        else if (player2.matchHp <= 0) {
            console.log(`Player 1 wins!`);
            alert(`Player 1 wins!`);
        }
    }
}

class cardGenerator {
    constructor(attack, defense, turnCost) {
        this.attack = attack;
        this.defense = defense;
        this.turnCost = turnCost;
        this.status = `in-hand`;
        this.turnAtk = this.attack;
        this.turnDef = this.defense;
        this.cardID = Math.random().toString(36).substring(2, 15);
        this.turns = 0;
    }
    domElement = null;
    // moveToInPlay() {
    //     this.status = `in-play`
    //     .append(this.domElement);
    // }
}

const fightStorer = {
    selectedCards: [],
}

const player1 = {
    name: `Player 1`,
    shortName: `p1`,
    // cardInHand: [],
    cardInGame: [],
    // cardInDiscard: [],
    matchHp: 10,
    playerTurn: true,
}
const player2 = {
    name: `Player 2`,
    shortName: `p2`,
    // cardInHand: [],
    cardInGame: [],
    // cardInDiscard: [],
    matchHp: 10,
    playerTurn: false,
}

// let match1 = new gameMatch(player1, player2);
// match1.drawCard(player1);
// match1.drawCard(player1);
// match1.drawCard(player1);
// match1.drawCard(player1);
// match1.drawCard(player2);
// match1.drawCard(player2);
// match1.drawCard(player2);
// match1.drawCard(player2);

// console.log(`---- BREAK ----`)
// // match1.playCard(player1, 1);
// match1.playCard(player1, 2);
// console.log(`---- BREAK ----`)
// match1.playCard(player2, 1);

// //Testing to ensure if no remaining cards, defending player2 HP is reduced
// match1.attack(player1, 2, player2, 1);
// console.log(`---- BREAK ----`)
// console.log(player1.matchHp);
// console.log(player2.matchHp);

// // Testing to ensure if remaining cards, defending player1 HP is not reduced
// match1.attack(player2, 1, player1, 2);
// console.log(`---- BREAK ----`)
// console.log(player1.matchHp);
// console.log(player2.matchHp);