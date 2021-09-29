const inquirer = require('inquirer');
const Player = require('./Player');
const Enemy = require('./Enemy');

function Game () {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;

    Game.prototype.initializeGame = function() {
        
        //these are enemy arrays to push into the enemy object in the constructor method above.
        this.enemies.push(new Enemy('goblin', 'sword'));
        this.enemies.push(new Enemy('orc', 'baseball bat'));
        this.enemies.push(new Enemy('skeleton', 'axe'));
    
        //this helps keep track of which enemy the player is fighting
        this.currentEnemy = this.enemies[0];

        //this prompts the player for their name for the game
        inquirer
            .prompt({
                type: 'text',
                name: 'name',
                message: 'What is your name?'
            })
            // then destructure the name from the prompt object 
            .then(({ name }) => {
                this.player = new Player(name);

                //test the object creation
                console.log(this.currentEnemy, this.player);
            });
    }
};

module.exports = Game;