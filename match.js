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
    }

    cardStatus(player, playersCard) {
        console.log(player.cardInGame[playersCard].status);
        switch(player.cardInGame[playersCard].status) {
            case `in-hand`: player.cardInGame[playersCard].status = `in-play`; break;
            case `in-play`: player.cardInGame[playersCard].status = `in-discard`; break;
        }
    }

    playCard(chosenPlayer, chosenCard) {
        console.log(`All ${chosenPlayer.name} cards`, chosenPlayer);
        // console.log(`A single ${chosenPlayer.name} card`, chosenPlayer.cardInGame[chosenCard]);
        this.cardStatus(chosenPlayer, chosenCard);
        // chosenPlayer.cardInGame[chosenCard].status = `in-play`;
        // chosenPlayer.cardInGame.push(chosenPlayer.cardInHand[chosenCard]);
        // chosenPlayer.cardInHand.splice(chosenCard, 1);
        console.log(`All ${chosenPlayer.name} cards updated`, chosenPlayer);
    }

    attack(attackingPlayer, attackingCard, defendingPlayer, defendingCard) {
        let remainingCards;
        let atkRemainingDef = attackingPlayer.cardInGame[attackingCard].turnDef - defendingPlayer.cardInGame[defendingCard].turnAtk;
        let defRemainingDef = defendingPlayer.cardInGame[defendingCard].turnDef - attackingPlayer.cardInGame[attackingCard].turnAtk;
        console.log(`Attacking card's remaining defense ${atkRemainingDef}`);
        console.log(`Defending card's remaining defense ${defRemainingDef}`);

        attackingPlayer.cardInGame[attackingCard].turnDef = atkRemainingDef;
        defendingPlayer.cardInGame[defendingCard].turnDef = defRemainingDef;

        if (atkRemainingDef <= 0) {
            this.cardStatus(attackingPlayer, attackingCard);
            remainingCards = attackingPlayer.cardInGame.filter(card => card.status === `in-play`);
            if (remainingCards.length === 0) {
                this.playerMatchHealth(attackingPlayer, atkRemainingDef);
            }
            // attackingPlayer.cardInGame[attackingCard].status = `in-discard`;
            // attackingPlayer.cardInDiscard.push(attackingPlayer.cardInGame[attackingCard]);
            // attackingPlayer.cardInGame.splice(attackingCard, 1);
        }
        if (defRemainingDef <= 0) {
            this.cardStatus(defendingPlayer, defendingCard);
            remainingCards = defendingPlayer.cardInGame.filter(card => card.status === `in-play`);
            if (remainingCards.length === 0) {
                this.playerMatchHealth(defendingPlayer, defRemainingDef);
            }
            // defendingPlayer.cardInGame[defendingCard].status = `in-discard`;
            // defendingPlayer.cardInDiscard.push(defendingPlayer.cardInGame[defendingCard]);
            // defendingPlayer.cardInGame.splice(defendingCard, 1);
        }
        console.log(`Player 1 cards`, player1)
        console.log(`Player 2 cards`, player2)
        this.matchEnd();
    }

    playerMatchHealth(thePlayer, healthReduction) {
        thePlayer.matchHp += healthReduction;
    }

    matchEnd() {
        if (player1.matchHp <= 0 && player2.matchHp <= 0) {
            console.log(`Its a tie!`)
        }
        else if (player1.matchHp <= 0 ) {
            console.log(`Player 2 wins!`)
        }
        else if (player2.matchHp <= 0) {
            console.log(`Player 1 wins!`)
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
        this.cardID = Math.random().toString(36);
    }
}

const player1 = {
    name: `Player 1`,
    // cardInHand: [],
    cardInGame: [],
    // cardInDiscard: [],
    matchHp: 3,
}
const player2 = {
    name: `Player 2`,
    // cardInHand: [],
    cardInGame: [],
    // cardInDiscard: [],
    matchHp: 3,
}

let match1 = new gameMatch(player1, player2);
match1.drawCard(player1);
match1.drawCard(player1);
match1.drawCard(player1);
match1.drawCard(player1);
match1.drawCard(player2);
match1.drawCard(player2);
match1.drawCard(player2);
match1.drawCard(player2);

console.log(`---- BREAK ----`)
// match1.playCard(player1, 1);
match1.playCard(player1, 2);
console.log(`---- BREAK ----`)
match1.playCard(player2, 1);

//Testing to ensure if no remaining cards, defending player2 HP is reduced
match1.attack(player1, 2, player2, 1);
console.log(`---- BREAK ----`)
console.log(player1.matchHp);
console.log(player2.matchHp);

// // Testing to ensure if remaining cards, defending player1 HP is not reduced
// match1.attack(player2, 1, player1, 2);
// console.log(`---- BREAK ----`)
// console.log(player1.matchHp);
// console.log(player2.matchHp);