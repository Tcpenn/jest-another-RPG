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

                //this starts the fighting between the player and enemy objects
                this.startNewBattle()
            });
    }

    Game.prototype.startNewBattle = function () {
        if (this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }

        console.log('Your stats are as follows:');
        console.table(this.player.getStats());
        console.log(this.currentEnemy.getDescription());

        this.battle()
    };

    Game.prototype.battle = function () {
        if (this.isPlayerTurn) {
            //player prompts will go here
            if(this.isPlayerTurn) {
                inquirer
                    .prompt({
                        type: 'list',
                        message: 'What would you like to do?',
                        name: 'action',
                        choices: ['Attack', 'Use potion'] 
                    })
                    .then(({ action }) => {
                        if (action === 'Use potion') {
                            //follow-up prompt will do here
                            if(!this.player.getInventory()) {
                                console.log("You don't have any potions!");
                                return;
                            }

                            inquirer
                                .prompt({
                                    type: 'list',
                                    message:'Which potion would you like to use?',
                                    name: 'action',
                                    choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                                })
                                .then(({ action }) => {
                                    const potionDetails = action.split(': ');
                                
                                    this.player.usePotion(potionDetails[0] - 1);
                                    console.log(`You used a ${potionDetails[1]} potion.`);
                                });
                        } else {
                            const damage = this.player.getAttackValue();
                            this.currentEnemy.reduceHealth(damage);

                            console.log(`You attacked the ${this.currentEnemy.name}`);
                            console.log(this.currentEnemy.getHealth());
                        }
                    });
            }
        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);

            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());
        }
    };
};

module.exports = Game;