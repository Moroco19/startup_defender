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
        // Maybe? turn the newAtk/Def/TuC variables into their own object ?
        playerTurn.cardInHand.push(newCard);
    }

    playCard(chosenPlayer, chosenCard) {
        console.log(`All ${chosenPlayer.name} cards`, chosenPlayer);
        console.log(`A single ${chosenPlayer.name} card`, chosenPlayer.cardInHand[chosenCard]);
        chosenPlayer.cardInHand[chosenCard].status = `in-play`;
        chosenPlayer.cardInPlay.push(chosenPlayer.cardInHand[chosenCard]);
        chosenPlayer.cardInHand.splice(chosenCard, 1);
        console.log(`All ${chosenPlayer.name} cards updated`, chosenPlayer);
    }

    attack(attackingPlayer, attackingCard, defendingPlayer, defendingCard) {
        let atkRemainingDef = attackingPlayer.cardInPlay[attackingCard].turnDef - defendingPlayer.cardInPlay[defendingCard].turnAtk;
        let defRemainingDef = defendingPlayer.cardInPlay[defendingCard].turnDef - attackingPlayer.cardInPlay[attackingCard].turnAtk;
        console.log(`Attacking card's remaining defense ${atkRemainingDef}`);
        console.log(`Defending card's remaining defense ${defRemainingDef}`);

        attackingPlayer.cardInPlay[attackingCard].turnDef = atkRemainingDef;
        defendingPlayer.cardInPlay[defendingCard].turnDef = defRemainingDef;

        if (atkRemainingDef <= 0) {
            attackingPlayer.cardInPlay[attackingCard].status = `in-discard`;
            attackingPlayer.cardInDiscard.push(attackingPlayer.cardInPlay[attackingCard]);
            attackingPlayer.cardInPlay.splice(attackingCard, 1);
        }
        if (defRemainingDef <= 0) {
            defendingPlayer.cardInPlay[defendingCard].status = `in-discard`;
            defendingPlayer.cardInDiscard.push(defendingPlayer.cardInPlay[defendingCard]);
            defendingPlayer.cardInPlay.splice(defendingCard, 1);
        }
        console.log(`Player 1 cards`, player1)
        console.log(`Player 2 cards`, player2)
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
    cardInHand: [],
    cardInPlay: [],
    cardInDiscard: [],
    matchHp: 30,
}
const player2 = {
    name: `Player 2`,
    cardInHand: [],
    cardInPlay: [],
    cardInDiscard: [],
    matchHp: 30,
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
match1.playCard(player1, 2);
console.log(`---- BREAK ----`)
match1.playCard(player2, 1);

match1.attack(player1, 0, player2, 0);