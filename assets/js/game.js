var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
console.log(enemyNames);
console.log(enemyNames[0]);
console.log(enemyNames[1])
console.log(enemyNames[2]);
console.log(enemyNames.length);

    //Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");

var fight = function(enemyName) {
    //repeat and exeute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
// ask player is they'd like to fight or run
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP to choose.");
    
    if (promptFight === "skip" || promptFight ==="SKIP") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!")
            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 10;
            console.log("playerMoney", playerMoney);
            break;
        }
    }

      //remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth= enemyHealth - playerAttack;
      console.log(
          playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
      );
//check enemy's health
if (enemyHealth <= 0) {
    window.alert(enemyName + " has died!");

    //award player money for winning
    playerMoney = playerMoney + 20;

    //leave while loop since enemy is dead
    break;
}
else {
    window.alert(enemyName + " still has " + enemyHealth + " health left.");
  }
    
    //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the 'playerHealth' variable
playerHealth = playerHealth - enemyAttack;

    //Log a resulting message to the console so we know that it worked
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );


//check player's health
if (playerHealth <=0) {
    window.alert(playerName + " has died!");
    break;
}
else {
    window.alert(playerName + " still has " + playerHealth + " health left.");
}
}
}

for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}
    //call fight funtction with enemy-robot
        fight(enemyNames[i]);
