//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min +1) +min);

    return value;
};

var fightOrSkip = function() {
    //ask player is they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt ("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
return fightOrSkip();
}
promptFight = promptFight.toLowerCase();

//if player picks "skip" confirm and then stop the loop
if (promptFight === "skip") {
//confirm player wants to skip
var confirmSkip = window.confirm("Are you sure you'd like to quit?");

//if yes (true), leave fight
if (confirmSkip) {
    window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
    //subtract money from playerMoney for skipping
    playerInfo.money = Math.max(0, playerInfo.money - 10);
    //return true if player wants to leave
    return true;
    }
}
    //return false if player wants to fight
    return false;

};


// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
    //keep track of who goes first
    var isPlayerTurn = true;
    //randomly change turn order
if (Math.random() > 0.5) {
    isPlayerTurn = false;
}

    
    //repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
        //ask player is they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
            //if true, leave fight by breaking loop
            break;
        }

      //remove enemy's health by subtracting the amount set in the playerAttack variable
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
          playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      );

//check enemy's health
if (enemy.health <= 0) {
    window.alert(enemy.name + " has died!");

    //award player money for winning
    playerInfo.money = playerInfo.money + 20;

    //leave while() loop since enemy is dead
    break;
} else {
    window.alert(enemy.name + " still has " + enemy.health + " health left.");
}
  } else {    
    //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the 'playerHealth' variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
playerInfo.health = Math.max(0, playerInfo.health - damage);

    //Log a resulting message to the console so we know that it worked
    console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );
    
//check player's health
if (playerInfo.health <=0) {
    window.alert(playerInfo.name + " has died!");
    break;
} else {
    window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
}
}
isPlayerTurn = !isPlayerTurn;
}
};

var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var startGame = function(){
    //rests player stats
    playerInfo.reset();

for(var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
        //Alert players that they are starting the round
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));

       
    var pickedEnemyObj = enemyInfo[i];

    //reset enemyHealth before starting new fight
    pickedEnemyObj.health = randomNumber(40, 60);

    //pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
       fight(pickedEnemyObj);

    //if player is still alive and  we're not at the last enemy in the array
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        shop();
    }
    }

    // if player is not alive, bteak out of the loop and let endGame function run
    else{
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}
 //after the loop ends, player is either out of health or enemies to fight, so run the endGame function    
endGame();
};

var endGame = function() {
    window.alert("The game has now ended. let's see how you did");
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    //if player has more money than the high score, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highScore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money +"!");
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + " . Maybe next time!");
    }

var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
    //restart the game
    startGame();
} else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
var shop = function() {
    console.log("entered the shop")
    //ask player what they would like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
        window.alert("Leaving the store.");
         //do nothing, so function will end
        break;
        default:
        window.alert("You did not pick a valid option. Try again.");
        //call shop() again to force player to pick a valid option
        shop();
        break;
    }
};
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >=7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health +=20;
        this.money -=7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
upgradeAttack: function() {
    if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
    this.attack +=6;
    this.money -=7;
}
else {
    window.alert("You don't have enough money!");
}
}
};

var enemyInfo =[
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    { 
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

startGame();
