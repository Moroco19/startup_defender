# startup_defender

A readme.md file which must include:
Tech Used:
-HTML, CSS, Javascript

Approach taken:
-Started with setting up the design of the match screen, configuring the HTML and CSS first, as HTML structure would help with determining what was needed in JS event listeners.
-After basics of page design were completed, went on to develop basic game logic in JS only to get a working game.
-After JS only version was completed, started code configuration to link JS and the DOM, reconfiguring the HTML and CSS files as needed to match the new JS code.

User stories:
Gamer - Wants to be able to relax with a simple turn based card fight game similar to MTG or Hearthstone.

Wireframes:
-Initial Menu Screen
  https://imgur.com/Ih8lkdu
  
-In-Game Menu Screen
https://imgur.com/u2j4B4H

-Store Screen
https://imgur.com/2tdaXTH

-Match Screen
https://imgur.com/DLxt27P

How-to-use instructions:
-Upon loading up the game, to start the player must draw a card by clicking on the Draw Card tile.
-After a card has been drawn, if the turn currency for the card (bottom number) is less than or equal to the turn currency indicated in the brown sphere on the left side of the player's screen, they can put the card into play.  A card cannot be used to attack in the same turn it was put into play.
-To end their turn, the player can click on the End Turn button.
-To win the game, the player can used their cards that have been put into play to attack the enemies cards (clicking on their card first, then the enemy card to attack), or if the enemy player has no cards in play they attacking player can click on the enemy's HP to attack their HP directly. When one player's HP is brought to 0 the game is over.

Unsolved problems:
-Clicking on text of cards or buttons prevents an actual click event from firing, which is unintended.
-Creating a start / continue screen.
-Creating pre-configured cards.
-Creating a way to track progress and earning game currency between matches.
-Creating a store to purchase additional cards.
-Adding a way to organize a deck with additional cards player has purchased.
-Adding simple logic for an AI to be able to play solo.
-Adding pre-configured decks to be randomly selected for AI player.