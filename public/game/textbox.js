// Control the text box 
// The game engine itself

const text_box = document.getElementById("text-box");
const command_input = document.getElementById("command-input");
const ambience = document.getElementById("ambience");
const swoosh = document.getElementById("swoosh");
const gunshot = document.getElementById("gunshot");
const fauto = document.getElementById("fauto");
const status = document.getElementById("status");

let not_played = 0;
let current_description = "";
let my_username = "";

const health = localStorage.getItem("pgmh-health");
const hunger = localStorage.getItem("pgmh-hunger");
const ammo = localStorage.getItem("pgmh-ammo");
const inventory = localStorage.getItem("pgmh-inventory");

let my_current_loc = my_loc;
let my_current_health = health; 
let my_current_hunger = hunger; 
let my_current_ammo = ammo;
let my_current_inventory = inventory;

// Variables for the key. 
const has_key = localStorage.getItem("pgmh-key");
let current_has_key = false;

// Threats 

let my_current_threat = "";

let deranged_man_hp = 45;
let crazed_woman_hp = 50;
let young_girl_hp = 15;
let teenager_hp = 60;
let evil_man_hp = 150;

// Fill slots if empty

if (health === "" || health === undefined || health === null) {
  localStorage.setItem("pgmh-health", "100");
  location.href = "";
}

else {
  // PASS
}

if (hunger === "" || hunger === undefined || hunger === null) {
  localStorage.setItem("pgmh-hunger", "100");
  location.href = "";
}

else {
  // PASS
}

if (ammo === "" || ammo === undefined || ammo === null) {
  localStorage.setItem("pgmh-ammo", "0");
  location.href = "";
}

else {
  // PASS
}

if (inventory === "" || inventory === undefined || inventory === null) {
  localStorage.setItem("pgmh-inventory", "medicine=0;snacks=0;skewer=0;hammer=0;pistol=0;carbine=0;mpistol=0");
  location.href = "";
}

else {
  // PASS
}

if (has_key === "" || has_key === undefined || has_key === null) {
  localStorage.setItem("pgmh-key", "false");
  location.href = "";
}

else {
  // PASS
}

let distract_slot = "";

setInterval(function () {
  status.innerText = "Health: " + my_current_health + "% Hunger: " + my_current_hunger + "% 9MM: " + my_current_ammo + "% Current Location: " + my_current_loc;

  fetch ("/distract")
  .then(response => response.text())
  .then(data => {
    if (distract_slot === data) {
      // PASS 
    }

    else {
      if (data === my_current_loc) {
        distract_slot = data;
        addText("Another wanderer distracts your enemy. The enemy slinks off into the darkness.");

        is_threat = false;
      }

      else {
        // PASS
      }
    }
  })
  .catch(error => {
    throw error; 
  });
}, 500);

function addText (text) {
  text_box.innerHTML = text_box.innerHTML + "<span class='error message'><p>" + text + "</p></span>";
  text_box.scrollTo(0, text_box.scrollHeight);
}

function checkIfNotPlayed () {
  if (not_played === 0) {
    ambience.play();
    not_played = 1;
  }

  else {
    // Pass
  }
}

function encounterKey () {
  const key_random = Math.floor(Math.random() * 10);

  if (key_random === 0) {
    addText("You found a key!");
    current_has_key = true; 
    localStorage.setItem("pgmh-key", "true");
  }

  else {
    // PASS
  }
}

function encounterEnemies () {
  const enemy_random = Math.floor(Math.random() * 4);
  console.log(enemy_random);

  if (enemy_random === 0) {
    addText(enemy_array[0]);
    my_current_threat = "deranged_man";

    is_threat = true;
    engageEnemy("deranged_man");
  }

  else if (enemy_random === 1) {
    addText(enemy_array[1]);
    my_current_threat = "crazed_woman";

    is_threat = true;
    engageEnemy("crazed_woman");
  }

  else if (enemy_random === 2) {
    addText(enemy_array[2]);
    my_current_threat = "young_girl";

    is_threat = true;
    engageEnemy("young_girl");
  }

  else if (enemy_random === 3) {
    addText(enemy_array[3]);
    my_current_threat = "teenager";

    is_threat = true;
    engageEnemy("teenager");
  }

  else {
    addText(enemy_array[4]);
    my_current_threat = "evil_man";

    is_threat = true;
    engageEnemy("evil_man");
  }
}

function deathScreen () {
  addText("YOU ARE DEAD."); 
  $("#command-input").hide();
  localStorage.setItem("pgmh-inventory", "medicine=0;snacks=0;skewer=0;hammer=0;pistol=0;carbine=0;mpistol=0");
  localStorage.setItem("pgmh-health", "100");
  localStorage.setItem("pgmh-hunger", "100");

  addText("YOU WILL BE REVIVED AT YOUR LAST LOCATION IN 5 SECONDS.");

  setTimeout(function () {
    location.href = "";
  }, 5000);
}

function engageEnemy (enemy) {
  attack_range = Math.floor(Math.random() * 3);

  if (enemy === "deranged_man") {
    if (is_threat === true) {
      swoosh.cloneNode(true).play();
      addText(enemy_attack_array[0]);

      if (attack_range === 0) {
        addText("You dodge the attack.");
      }

      else {
        addText(enemy_hit_array[0]);
        my_current_health = my_current_health - 45;
        localStorage.setItem("pgmh-health", my_current_health);

        if (my_current_health < 1) {
          deathScreen();
        }

        else {
          setTimeout(function () {
            engageEnemy("deranged_man");
          }, 2000);
        }
      }
    }

    else {
      if (deranged_man_hp < 1) {
        addText("The deranged man is now dead.");
        is_threat = false;
        deranged_man_hp = 45;
      }

      else {
        // Player ran away
        deranged_man_hp = 45;
      }
    }
  }

  else if (enemy === "crazed_woman") {
    if (is_threat === true) {
      gunshot.cloneNode(true).play();
      addText(enemy_attack_array[1]);

      if (attack_range === 0) {
        addText("You dodge the attack.");
      }

      else {
        addText(enemy_hit_array[1]);
        my_current_health = my_current_health - 40;
        localStorage.setItem("pgmh-health", my_current_health);

        if (my_current_health < 1) {
          deathScreen();
        }

        else {
          // Pass

          setTimeout(function () {
            engageEnemy("crazed_woman");
          }, 2000);
        }
      }
    }

    else {
      if (crazed_woman_hp < 1) {
        addText("The crazed_woman is now dead.");
        is_threat = false;
        crazed_woman_hp = 50;
      }

      else {
        // Player ran away
        crazed_woman_hp = 50;
      }
    }
  }

  else if (enemy === "young_girl") {
    if (is_threat === true) {
      swoosh.cloneNode(true).play();
      addText(enemy_attack_array[2]);

      if (attack_range === 0) {
        addText("You dodge the attack.");
      }

      else {
        addText(enemy_hit_array[2]);
        my_current_health = my_current_health - 20;
        localStorage.setItem("pgmh-health", my_current_health);

        if (my_current_health < 1) {
          deathScreen();
        }

        else {
          // Pass

          setTimeout(function () {
            engageEnemy("young_girl");
          }, 2000);
        }
      }
    }

    else {
      if (young_girl_hp < 1) {
        addText("The young girl is now dead.");
        is_threat = false;
        young_girl_hp = 10;
      }

      else {
        // Player ran away
        young_girl_hp = 10;
      }
    }
  }

  else if (enemy === "teenager") {
    if (is_threat === true) {
      gunshot.cloneNode(true).play();
      addText(enemy_attack_array[3]);

      if (attack_range === 0) {
        addText("You dodge the attack.");
      }

      else {
        addText(enemy_hit_array[3]);
        my_current_health = my_current_health - 60;
        localStorage.setItem("pgmh-health", my_current_health);

        if (my_current_health < 1) {
          deathScreen();
        }

        else {
          // Pass

          setTimeout(function () {
            engageEnemy("teenager");
          }, 2000);
        }
      }
    }

    else {
      if (teenager_hp < 1) {
        addText("The teenager is now dead.");
        is_threat = false;
        teenager_hp = 50;
      }

      else {
        // Player ran away
        teenager_hp = 50;
      }
    }
  }

  else if (enemy === "evil_man") {
    if (is_threat === true) {
      fauto.cloneNode(true).play();
      addText(enemy_attack_array[4]);

      if (attack_range === 0) {
        addText("You dodge the attack.");
      }

      else {
        addText(enemy_hit_array[4]);
        my_current_health = my_current_health - 50;
        localStorage.setItem("pgmh-health", my_current_health);

        if (my_current_health < 1) {
          deathScreen();
        }

        else {
          // Pass

          setTimeout(function () {
            engageEnemy("evil_man");
          }, 2000);
        }
      }
    }

    else {
      if (evil_man_hp < 1) {
        addText("The evil man is now dead.");
        is_threat = false;
        evil_man_hp = 130;
      }

      else {
        // Player ran away
        evil_man_hp = 130;
      }
    }
  }
}

setInterval(function () {
  if (my_current_hunger > 0) {
    my_current_hunger = parseInt(my_current_hunger) - 5;
    localStorage.setItem("pgmh-hunger", my_current_hunger);
  }

  else {
    my_current_health = parseInt(my_current_health) - 5;
    localStorage.setItem("pgmh-health", my_current_health);

    if (my_current_health < 1) {
      deathScreen();
    }

    else {
      // PASS
    }
  }
}, 30000);

// Detect if player is in the same area as another player 

let multi_coords_slot = "";

/* setInterval(function () {
  fetch ("/coords")
  .then(response => response.text())
  .then(data => {
    const behind_coords = data.split("||");
    const user_behind_coords = behind_coords[0];
    const coords_behind_coords = behind_coords[1];

    if (data === multi_coords_slot) {
      console.log("Slot is already filled with identical value!");
    }

    else {
      multi_coords_slot = data;
      
      if (user_behind_coords === my_username) {
        // PASS 
      }

      else {
        addText(user_behind_coords + " is in your area. Multiplayer commands are usable now.");
      }
    }
  })
  .catch(error => {
    throw error;
  });

  fetch ("/coords", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      username : my_username,
      coords : my_current_loc
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    throw error;
  });
}, 500);
*/

function playerAlert () {
  fetch ("/get-array")
  .then(response => response.text())
  .then(data => {
    let number_of_players_in_area = 0;
    const player_parse_array = JSON.parse(data);

    console.log(player_parse_array);

    for (i = 0; i < player_parse_array.length; i++) {
      if (player_parse_array[i].includes(my_current_loc)) {
        number_of_players_in_area = number_of_players_in_area + 1;

        const other_player_id_1 = player_parse_array[i].split("||");
        const other_player_id_2 = other_player_id_1[0];

        if (player_parse_array[i].includes(my_username)) {
          // PASS 
        }

        else {
          addText(other_player_id_2 + " is in your area.");
        }
      }

      else {
        // PASS
      }
    }

    if (number_of_players_in_area > 1) {
      addText("You are not alone in your area. Multiplayer commands are now enabled.");
    }
  })
  .catch(error => {
    throw error;
  });

  fetch ("/post-array", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      username : my_username,
      coords : my_current_loc
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    throw error;
  });
}

$("#command-form").submit(function () {
  event.preventDefault();

  if (command_input.value.toLowerCase() === "help") {
    addText(`
HELP - Returns a list of commands. 
<br/>
LOOK - Look at your surroundings.
<br/>
WANDER - Search for supplies and explore the pharmacy.
<br/>
CHAT - Example: CHAT example would send out 'example'.
<br/>
RUN - Turn corners in the dark, run away from entities.
<br/>
TAKE - Take items from areas when they are present.
<br/>
INVENTORY - Returns a list of items on you.
<br/>
MEDICINE - Use medicine in a medicine area, or use
medicine from your inventory.
<br/>
EAT - Use food in a snack area, or use food
from your inventory.
<br/>
CAMP - Build a campsite to let other players know where you are.
<br/>
GOTO - Example: GOTO 000 would send you to 000, but be prepared to meet enemies along the way.
<br/>
W0 - Use your fists to fight.
<br/>
W1 - Use a skewer (if present).
<br/>
W2 - Use a hammer (if present).
<br/>
W3 - Use a pistol (if present).
<br/>
W4 - Use a carbine (if present).
<br/>
W5 - Use a machine pistol (if present).
<br/>
KEY - Use a key. 
<br/>
DISTRACT - Distract an enemy in your area and allow for a player to get away. 
    `);
  }

  else if (command_input.value.toLowerCase() === "look") {
    addText(current_description);
  }

  else if (command_input.value.toLowerCase() === "wander") {
    if (is_threat === true) {
      return false;
    }

    const coord_1 = Math.floor(Math.random() * 6);
    const coord_2 = Math.floor(Math.random() * 3);
    const coord_3 = Math.floor(Math.random() * 4);

    const coord_pos = String(coord_1) + String(coord_2) + String(coord_3);
    localStorage.setItem("pgmh-myloc", coord_pos);
    my_current_loc = String(coord_pos);

    playerAlert();
    encounterKey();

    function checkEncounters () {
      console.log("Checking encounters...");
      console.log(my_current_loc.charAt(2));

      if (my_current_loc.charAt(1) === "0" || my_current_loc.charAt(1) === "3") {
        console.log("Checking signs...");
        console.log(my_current_loc.charAt(3));

        if (my_current_loc.charAt(2) === "0") {
          addText(sign_array[0]);
        }

        else if (my_current_loc.charAt(2) === "1") {
          addText(sign_array[1]);
        }

        else if (my_current_loc.charAt(2) === "2") {
          addText(sign_array[2]);
        }

        else if (my_current_loc.charAt(2) === "3") {
          addText(sign_array[3]);
        }

        else if (my_current_loc.charAt(2) === "4") {
          addText(sign_array[4]);
        }

        else {
          console.log("Error");
        }
      } 

      else {
        console.log("Checking dead bodies...");
        console.log(my_current_loc.charAt(2));

        if (my_current_loc.charAt(2) === "0") {
          addText(death_array[0]);
        }

        else if (my_current_loc.charAt(2) === "1") {
          addText(death_array[1]);
        }

        else if (my_current_loc.charAt(2) === "2") {
          addText(death_array[2]);
        }

        else if (my_current_loc.charAt(2) === "3") {
          addText(death_array[3]);
        }

        else if (my_current_loc.charAt(2) === "4") {
          addText(death_array[4]);
        }

        else {
          console.log("Error");
        }
      }
    }

    if (my_current_loc.charAt(0) === "0") {
      addText(area_array[0]);
      current_description = area_array[0];
    }

    else if (my_current_loc.charAt(0) === "1") {
      addText(area_array[1]);
      current_description = area_array[1];
    }

    else if (my_current_loc.charAt(0) === "2") {
      addText(area_array[2]);
      current_description = area_array[2];
    }

    else if (my_current_loc.charAt(0) === "3") {
      addText(area_array[3]);
      current_description = area_array[3];
    }

    else if (my_current_loc.charAt(0) === "4") {
      addText(area_array[4]);
      current_description = area_array[4];
    }

    else if (my_current_loc.charAt(0) === "5") {
      addText(area_array[5]);
      current_description = area_array[5];
    }

    else if (my_current_loc.charAt(0) === "6") {
      addText(area_array[6]);
      current_description = area_array[6];
    }

    else {
      console.log("Error");
    }

    checkEncounters();

    const encounter_enemy = Math.floor(Math.random() * 2);

    if (encounter_enemy === 0) {
      encounterEnemies();
    }

    else {
      // Pass
    }
  }

  else if (command_input.value.toLowerCase().startsWith("chat")) {
    const message = command_input.value.slice("5");
    
    fetch ("/chat", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        username : my_username,
        message : message
      })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      addText(error);
    });
  }

  else if (command_input.value.toLowerCase() === "run") {
    if (is_threat === false) {
      addText("There isn't a threat to run from.");
    }

    else {
      run_random = Math.floor(Math.random() * 3);

      if (run_random === 0) {
        is_threat = false;
        addText("You ran away.");
      }

      else {
        addText("You failed to run away.");
        engageEnemy(my_current_threat);
      }
    }
  }

  else if (command_input.value.toLowerCase() === "take") {
    if (area_array[parseInt(my_current_loc.charAt(0))] === "There really isn't much to look at here. Just rows and rows of unmarked medicine. However, you can heal yourself if needed by using the MEDICINE command.") {
      addText(item_takes_array[0]);

      const inventory_pre_1 = my_current_inventory.split(";");
      const inventory_pre_2 = inventory_pre_1[0];
      const inventory_pre_3 = inventory_pre_2.split("medicine=");
      const inventory_pre_4 = inventory_pre_3[1];
      const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
      const inventory_pre_6 = "medicine=" + inventory_pre_5;

      my_current_inventory = inventory_pre_6 + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
      localStorage.setItem("pgmh-inventory", my_current_inventory);
    }

    else if (area_array[parseInt(my_current_loc.charAt(0))] === `The snacks aren't marked with any logos or brands, but their bright colors pop out at you and you can recognise more than a few of them. 
Type EAT to eat the snacks and replenish your hunger bar.`) {
      addText(item_takes_array[2]);

      const inventory_pre_1 = my_current_inventory.split(";");
      const inventory_pre_2 = inventory_pre_1[1];
      const inventory_pre_3 = inventory_pre_2.split("snacks=");
      const inventory_pre_4 = inventory_pre_3[1];
      const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
      const inventory_pre_6 = "snacks=" + inventory_pre_5;

      my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_6 + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
      localStorage.setItem("pgmh-inventory", my_current_inventory);
    }

    else if (area_array[parseInt(my_current_loc.charAt(0))] === "The aisles of this area seem to never end, but somehow the toys in the aisles bring you comfort.") {
      addText(item_takes_array[4]);

      const inventory_pre_1 = my_current_inventory.split(";");
      const inventory_pre_2 = inventory_pre_1[2];
      const inventory_pre_3 = inventory_pre_2.split("skewer=");
      const inventory_pre_4 = inventory_pre_3[1];
      const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
      const inventory_pre_6 = "skewer=" + inventory_pre_5;

      my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_6 + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
      localStorage.setItem("pgmh-inventory", my_current_inventory);
    }

    else if (area_array[parseInt(my_current_loc.charAt(0))] === "Office and school supplies are hung up on a cardboard display. There is also a hammer here as well. TAKE it perhaps?") {
      addText(item_takes_array[1]);

      const inventory_pre_1 = my_current_inventory.split(";");
      const inventory_pre_2 = inventory_pre_1[3];
      const inventory_pre_3 = inventory_pre_2.split("hammer=");
      const inventory_pre_4 = inventory_pre_3[1];
      const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
      const inventory_pre_6 = "hammer=" + inventory_pre_5;

      my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_6 + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
      localStorage.setItem("pgmh-inventory", my_current_inventory);
    }

    else {
      addText("There's nothing to take here.");
    }
  }

  else if (command_input.value.toLowerCase() === "inventory") {
    const inventory_pre_1 = my_current_inventory.split(";");

    const inventory_medicine_1 = inventory_pre_1[0];
    const inventory_medicine_2 = inventory_medicine_1.split("medicine=");
    const inventory_medicine_3 = inventory_medicine_2[1];

    const inventory_snack_1 = inventory_pre_1[1];
    const inventory_snack_2 = inventory_snack_1.split("snacks=");
    const inventory_snack_3 = inventory_snack_2 [1];

    const inventory_skewer_1 = inventory_pre_1[2];
    const inventory_skewer_2 = inventory_skewer_1.split("skewer=");
    const inventory_skewer_3 = inventory_skewer_2[1];

    const inventory_hammer_1 = inventory_pre_1[3];
    const inventory_hammer_2 = inventory_hammer_1.split("hammer=");
    const inventory_hammer_3 = inventory_hammer_2[1];

    const inventory_pistol_1 = inventory_pre_1[4];
    const inventory_pistol_2 = inventory_pistol_1.split("pistol=");
    const inventory_pistol_3 = inventory_pistol_2[1];

    const inventory_carbine_1 = inventory_pre_1[5];
    const inventory_carbine_2 = inventory_carbine_1.split("carbine=");
    const inventory_carbine_3 = inventory_carbine_2[1];

    const inventory_mpistol_1 = inventory_pre_1[6];
    const inventory_mpistol_2 = inventory_mpistol_1.split("mpistol=");
    const inventory_mpistol_3 = inventory_mpistol_2[1];

    addText(`
MEDICINE : ` + inventory_medicine_3 + `
<br/>
SNACKS : ` + inventory_snack_3 + `
<br/>
SKEWERS : ` + inventory_skewer_3 + `
<br/>
HAMMERS : ` + inventory_hammer_3 + `
<br/>
PL-14s : ` + inventory_pistol_3 + `
<br/>
KEL-TEC SUB 2000s : ` + inventory_carbine_3 + `
<br/>
Berreta 93Rs : ` + inventory_mpistol_3 + `
    `);
  }

  else if (command_input.value.toLowerCase() === "medicine") {
    if (area_array[parseInt(my_current_loc.charAt(0))] === "There really isn't much to look at here. Just rows and rows of unmarked medicine. However, you can heal yourself if needed by using the MEDICINE command.") {
      if (parseInt(my_current_health) > 99) {
        addText("You are at full health.");
      }

      else {
        my_current_health = parseInt(my_current_health) + 30;
        localStorage.setItem("pgmh-health", my_current_health);
      }
    }

    else {
      const inventory_pre_1 = my_current_inventory.split(";");
      const inventory_pre_2 = inventory_pre_1[0];
      const inventory_pre_3 = inventory_pre_2.split("medicine=");
      const inventory_pre_4 = inventory_pre_3[1];

      if (parseInt(inventory_pre_4) > 0) {
        if (parseInt(my_current_health) > 99) {
          addText("You tried to use the medicine, but it didn't work.");
        }

        else {
          my_current_health = parseInt(my_current_health) + 30;
          localStorage.setItem("pgmh-health", my_current_health);
        }

        const inventory_pre_5 = String(parseInt(inventory_pre_4) - 1);
        const inventory_pre_6 = "medicine=" + inventory_pre_5;

        my_current_inventory = inventory_pre_6 + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
        localStorage.setItem("pgmh-inventory", my_current_inventory);
      }

      else {
        addText("No medicine was found in your inventory. Cannot heal.");
      }
    }
  }

  else if (command_input.value.toLowerCase() === "eat") {
    if (area_array[parseInt(my_current_loc.charAt(0))] === `The snacks aren't marked with any logos or brands, but their bright colors pop out at you and you can recognise more than a few of them. 
Type EAT to eat the snacks and replenish your hunger bar.`) {
      if (parseInt(my_current_hunger) < 99) {
        my_current_hunger = parseInt(my_current_hunger) + 30;
        localStorage.setItem("pgmh-hunger", my_current_hunger);
      }

      else {
        addText("Your hunger bar is full.");
      }
    }

    else {
      const inventory_pre_1 = my_current_inventory.split(";");
      const inventory_pre_2 = inventory_pre_1[1];
      const inventory_pre_3 = inventory_pre_2.split("snacks=");
      const inventory_pre_4 = inventory_pre_3[1];

      if (parseInt(inventory_pre_4) > 0) {
        if (parseInt(my_current_hunger) > 99) {
          my_current_health = my_current_health + 30;
          localStorage.setItem("pgmh-hunger", my_current_hunger);
        }

        else {
          addText("You tried to eat, but you just ended up spitting it out.");
        }

        const inventory_pre_5 = String(parseInt(inventory_pre_4) - 1);
        const inventory_pre_6 = "snacks=" + inventory_pre_5;

        my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_6 + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
        localStorage.setItem("pgmh-inventory", my_current_inventory);
      }

      else {
        addText("No food or drink was found in your inventory. Cannot eat.");
      }
    }
  }

  else if (command_input.value.toLowerCase() === "camp") {
    fetch ("/camp", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        coords : my_current_loc
      })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      throw error;
    });

    addText("You use some shelves and a blanket from one of the aisles to build a rudimentary campsite.");
  }

  else if (command_input.value.toLowerCase().startsWith("goto")) {
    const coords = command_input.value.slice("5");

    if (isNaN(coords)) {
      addText("Please enter valid coordinates.");
    }

    else {
      if (coords.length > 3 || coords.length < 3) {
        addText("Coordinates cannot be over the value of 999 or below the value of 000.");
      }

      else {
        if (is_threat === true) {
          addText("Trying to escape? Try to RUN instead.");
        }

        else {
          encounterEnemies();
          encounterKey();
          addText("You have arrived at the coordinates you entered.");
          playerAlert();

          my_current_loc = coords;
          localStorage.setItem("pgmh-myloc", coords);
        }
      }
    }
  }

  else if (command_input.value.toLowerCase() === "w0") {
    swoosh.play();

    const inventory_pre_1 = my_current_inventory.split(";");

    if (is_threat === true) {
      if (my_current_threat === "deranged_man") {
        addText("A punch sends the man flying backwards.");

        deranged_man_hp = deranged_man_hp - 10;

        if (deranged_man_hp < 1) {
          addText("The deranged man is now dead.");
          addText("You got a skewer from his remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[2];
          const inventory_pre_3 = inventory_pre_2.split("skewer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "skewer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_6 + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          deranged_man_hp = 45;
        }
      }

      else if (my_current_threat === "crazed_woman") {
        addText("A sucker punch knocks the woman back a bit.");

        crazed_woman_hp = crazed_woman_hp - 10;

        if (deranged_man_hp < 1) {
          addText("The crazed woman is now dead.");
          addText("You got a pistol from her remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[4];
          const inventory_pre_3 = inventory_pre_2.split("pistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "pistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_6 + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          crazed_woman_hp = 50;
        }
      }

      else if (my_current_threat === "young_girl") {
        addText("A well aimed punch completely obliterates your target.");

        young_girl_hp = young_girl_hp - 15;

        if (young_girl_hp < 1) {
          addText("The young girl is now dead.");
          addText("You got a hammer from her remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[3];
          const inventory_pre_3 = inventory_pre_2.split("hammer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "hammer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_6 + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          young_girl_hp = 50;
        }
      }

      else if (my_current_threat === "teenager") {
        addText("A powerful punch keeps the teenager away from you for a few moments.");

        teenager_hp = teenager_hp - 10;

        if (teenager_hp < 1) {
          addText("The teenager is now dead.");
          addText("You got a carbine from the remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[5];
          const inventory_pre_3 = inventory_pre_2.split("carbine=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "carbine=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_6 + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          teenager_hp = 60;
        }
      }

      else {
        addText("Your punches just seem to bounce off of him...");

        evil_man_hp = evil_man_hp - 10;

        if (evil_man_hp < 1) {
          addText("The evil man is now dead.");
          addText("You got a machine pistol and 5 9mm from his remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[6];
          const inventory_pre_3 = inventory_pre_2.split("mpistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "mpistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_6;
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          evil_man_hp = 150;
        }
      }
    }

    else {
      addText("You swing your fists in the air.")
    }
  }

    else if (command_input.value.toLowerCase() === "w1") {
    swoosh.play();

    const inventory_pre_1 = my_current_inventory.split(";");
    const inventory_skewer_1 = inventory_pre_1[2];
    const inventory_skewer_2 = inventory_skewer_1.split("skewer=");
    const inventory_skewer_3 = inventory_skewer_2[1];

    if (parseInt(inventory_skewer_3) < 1) {
      addText("You don't have a skewer.");
      return false; 
    }

    if (is_threat === true) {
      if (my_current_threat === "deranged_man") {
        addText(player_hit_array[0]);

        deranged_man_hp = deranged_man_hp - 20;

        if (deranged_man_hp < 1) {
          addText("The deranged man is now dead.");
          addText("You got a skewer from his remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[2];
          const inventory_pre_3 = inventory_pre_2.split("skewer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "skewer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_6 + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          deranged_man_hp = 45;
        }
      }

      else if (my_current_threat === "crazed_woman") {
        addText(player_hit_array[1]);

        crazed_woman_hp = crazed_woman_hp - 20;

        if (deranged_man_hp < 1) {
          addText("The crazed woman is now dead.");
          addText("You got a pistol and a box of 9mm from her remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[4];
          const inventory_pre_3 = inventory_pre_2.split("pistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "pistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_6 + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          crazed_woman_hp = 50;
        }
      }

      else if (my_current_threat === "young_girl") {
        addText(player_hit_array[2]);

        young_girl_hp = young_girl_hp - 20;

        if (young_girl_hp < 1) {
          addText("The young girl is now dead.");
          addText("You got a hammer from her remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[3];
          const inventory_pre_3 = inventory_pre_2.split("hammer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "hammer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_6 + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          young_girl_hp = 50;
        }
      }

      else if (my_current_threat === "teenager") {
        addText("The skewer manages to tear off some of the teenager's exposed flesh.");

        teenager_hp = teenager_hp - 20;

        if (teenager_hp < 1) {
          addText("The teenager is now dead.");
          addText("You got a carbine and a box of 9mm from the remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[5];
          const inventory_pre_3 = inventory_pre_2.split("carbine=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "carbine=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_6 + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          teenager_hp = 60;
        }
      }

      else {
        addText(player_hit_array[3]);

        evil_man_hp = evil_man_hp - 10;

        if (evil_man_hp < 1) {
          addText("The evil man is now dead.");
          addText("You got a machine pistol and a box of 9mm from his remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[6];
          const inventory_pre_3 = inventory_pre_2.split("mpistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "mpistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_6;
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          evil_man_hp = 150;
        }
      }
    }
}

else if (command_input.value.toLowerCase() === "w2") {
    swoosh.play();

    const inventory_pre_1 = my_current_inventory.split(";");
    const inventory_skewer_1 = inventory_pre_1[3];
    const inventory_skewer_2 = inventory_skewer_1.split("hammer=");
    const inventory_skewer_3 = inventory_skewer_2[1];

    if (parseInt(inventory_skewer_3) < 1) {
      addText("You don't have a hammer.");
      return false; 
    }

    if (is_threat === true) {
      if (my_current_threat === "deranged_man") {
        addText(player_hit_array[9]);

        deranged_man_hp = deranged_man_hp - 22;

        if (deranged_man_hp < 1) {
          addText("The deranged man is now dead.");
          addText("You got a skewer from his remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[2];
          const inventory_pre_3 = inventory_pre_2.split("skewer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "skewer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_6 + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          deranged_man_hp = 45;
        }
      }

      else if (my_current_threat === "crazed_woman") {
        addText(player_hit_array[10]);

        crazed_woman_hp = crazed_woman_hp - 22;

        if (deranged_man_hp < 1) {
          addText("The crazed woman is now dead.");
          addText("You got a pistol and a box of 9mm from her remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[4];
          const inventory_pre_3 = inventory_pre_2.split("pistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "pistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_6 + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          crazed_woman_hp = 50;
        }
      }

      else if (my_current_threat === "young_girl") {
        addText(player_hit_array[11]);

        young_girl_hp = young_girl_hp - 22;

        if (young_girl_hp < 1) {
          addText("The young girl is now dead.");
          addText("You got a hammer from her remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[3];
          const inventory_pre_3 = inventory_pre_2.split("hammer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "hammer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_6 + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          young_girl_hp = 50;
        }
      }

      else if (my_current_threat === "teenager") {
        addText("The hammer manages to knock the teenaget back.");

        teenager_hp = teenager_hp - 22;

        if (teenager_hp < 1) {
          addText("The teenager is now dead.");
          addText("You got a carbine and a box of 9mm from the remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[5];
          const inventory_pre_3 = inventory_pre_2.split("carbine=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "carbine=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_6 + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          teenager_hp = 60;
        }
      }

      else {
        addText(player_hit_array[13]);

        evil_man_hp = evil_man_hp - 22;

        if (evil_man_hp < 1) {
          addText("The evil man is now dead.");
          addText("You got a machine pistol and a box of 9mm from his remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[6];
          const inventory_pre_3 = inventory_pre_2.split("mpistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "mpistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_6;
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          evil_man_hp = 150;
        }
      }
    }

    else {
      addText("You knock a few shelves over with your hammer.");
    }
  }

  else if (command_input.value.toLowerCase() === "w3") {
    const inventory_pre_1 = my_current_inventory.split(";");
    const inventory_skewer_1 = inventory_pre_1[3];
    const inventory_skewer_2 = inventory_skewer_1.split("pistol=");
    const inventory_skewer_3 = inventory_skewer_2[1];

    if (parseInt(inventory_skewer_3) < 1) {
      addText("You don't have a pistol.");
      return false; 
    }

    else {
      if (my_current_ammo < 1) {
        addText("You don't have enough bullets.");
        return false;
      }
    }

    gunshot.play();

    my_current_ammo = parseInt(my_current_ammo) - 1;
    localStorage.setItem("pgmh-ammo", my_current_ammo);

    if (is_threat === true) {
      if (my_current_threat === "deranged_man") {
        addText(player_hit_array[4]);

        deranged_man_hp = deranged_man_hp - 40;

        if (deranged_man_hp < 1) {
          addText("The deranged man is now dead.");
          addText("You got a skewer from his remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[2];
          const inventory_pre_3 = inventory_pre_2.split("skewer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "skewer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_6 + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          deranged_man_hp = 45;
        }
      }

      else if (my_current_threat === "crazed_woman") {
        addText(player_hit_array[5]);

        crazed_woman_hp = crazed_woman_hp - 40;

        if (deranged_man_hp < 1) {
          addText("The crazed woman is now dead.");
          addText("You got a pistol and a box of 9mm from her remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[4];
          const inventory_pre_3 = inventory_pre_2.split("pistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "pistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_6 + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          crazed_woman_hp = 50;
        }
      }

      else if (my_current_threat === "young_girl") {
        addText(player_hit_array[6]);

        young_girl_hp = young_girl_hp - 40;

        if (young_girl_hp < 1) {
          addText("The young girl is now dead.");
          addText("You got a hammer from her remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[3];
          const inventory_pre_3 = inventory_pre_2.split("hammer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "hammer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_6 + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          young_girl_hp = 50;
        }
      }

      else if (my_current_threat === "teenager") {
        addText("The bullet causes the teenager to scream out in pain.");

        teenager_hp = teenager_hp - 40;

        if (teenager_hp < 1) {
          addText("The teenager is now dead.");
          addText("You got a carbine and a box of 9mm from the remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[5];
          const inventory_pre_3 = inventory_pre_2.split("carbine=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "carbine=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_6 + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          teenager_hp = 60;
        }
      }

      else {
        addText(player_hit_array[8]);

        evil_man_hp = evil_man_hp - 40;

        if (evil_man_hp < 1) {
          addText("The evil man is now dead.");
          addText("You got a machine pistol and a box of 9mm from his remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[6];
          const inventory_pre_3 = inventory_pre_2.split("mpistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "mpistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_6;
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          evil_man_hp = 150;
        }
      }
    }

    else {
      addText("Your bullet causes a few shelves in the distance to implode.");
    }
  }

  else if (command_input.value.toLowerCase() === "w4") {
    const inventory_pre_1 = my_current_inventory.split(";");
    const inventory_skewer_1 = inventory_pre_1[5];
    const inventory_skewer_2 = inventory_skewer_1.split("carbine=");
    const inventory_skewer_3 = inventory_skewer_2[1];

    if (parseInt(inventory_skewer_3) < 1) {
      addText("You don't have a carbine.");
      return false; 
    }

    else {
      if (my_current_ammo < 1) {
        addText("You don't have enough bullets.");
        return false;
      }
    }

    gunshot.play();

    my_current_ammo = parseInt(my_current_ammo) - 1;
    localStorage.setItem("pgmh-ammo", my_current_ammo);

    if (is_threat === true) {
      if (my_current_threat === "deranged_man") {
        addText(player_hit_array[4]);

        deranged_man_hp = deranged_man_hp - 60;

        if (deranged_man_hp < 1) {
          addText("The deranged man is now dead.");
          addText("You got a skewer from his remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[2];
          const inventory_pre_3 = inventory_pre_2.split("skewer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "skewer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_6 + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          deranged_man_hp = 45;
        }
      }

      else if (my_current_threat === "crazed_woman") {
        addText(player_hit_array[5]);

        crazed_woman_hp = crazed_woman_hp - 60;

        if (deranged_man_hp < 1) {
          addText("The crazed woman is now dead.");
          addText("You got a pistol and a box of 9mm from her remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[4];
          const inventory_pre_3 = inventory_pre_2.split("pistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "pistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_6 + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          crazed_woman_hp = 50;
        }
      }

      else if (my_current_threat === "young_girl") {
        addText(player_hit_array[6]);

        young_girl_hp = young_girl_hp - 60;

        if (young_girl_hp < 1) {
          addText("The young girl is now dead.");
          addText("You got a hammer from her remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[3];
          const inventory_pre_3 = inventory_pre_2.split("hammer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "hammer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_6 + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          young_girl_hp = 50;
        }
      }

      else if (my_current_threat === "teenager") {
        addText("The bullet causes the teenager to scream out in pain.");

        teenager_hp = teenager_hp - 60;

        if (teenager_hp < 1) {
          addText("The teenager is now dead.");
          addText("You got a carbine and a box of 9mm from the remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[5];
          const inventory_pre_3 = inventory_pre_2.split("carbine=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "carbine=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_6 + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          teenager_hp = 60;
        }
      }

      else {
        addText(player_hit_array[8]);

        evil_man_hp = evil_man_hp - 60;

        if (evil_man_hp < 1) {
          addText("The evil man is now dead.");
          addText("You got a machine pistol and a box of 9mm from his remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[6];
          const inventory_pre_3 = inventory_pre_2.split("mpistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "mpistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_6;
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          evil_man_hp = 150;
        }
      }
    }

    else {
      addText("Your bullet bounces around the walls of the pharmacy.");
    }
  }

  else if (command_input.value.toLowerCase() === "w5") {
    const inventory_pre_1 = my_current_inventory.split(";");
    const inventory_skewer_1 = inventory_pre_1[6];
    const inventory_skewer_2 = inventory_skewer_1.split("mpistol=");
    const inventory_skewer_3 = inventory_skewer_2[1];

    if (parseInt(inventory_skewer_3) < 1) {
      addText("You don't have a machine pistol.");
      return false; 
    }

    else {
      if (my_current_ammo < 3) {
        addText("You don't have enough bullets.");
        return false;
      }
    }

    fauto.play();

    my_current_ammo = parseInt(my_current_ammo) - 3;
    localStorage.setItem("pgmh-ammo", my_current_ammo);

    if (is_threat === true) {
      if (my_current_threat === "deranged_man") {
        addText(player_hit_array[4]);

        deranged_man_hp = deranged_man_hp - 80;

        if (deranged_man_hp < 1) {
          addText("The deranged man is now dead.");
          addText("You got a skewer from his remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[2];
          const inventory_pre_3 = inventory_pre_2.split("skewer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "skewer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_6 + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          deranged_man_hp = 45;
        }
      }

      else if (my_current_threat === "crazed_woman") {
        addText(player_hit_array[5]);

        crazed_woman_hp = crazed_woman_hp - 80;

        if (deranged_man_hp < 1) {
          addText("The crazed woman is now dead.");
          addText("You got a pistol and a box of 9mm from her remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[4];
          const inventory_pre_3 = inventory_pre_2.split("pistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "pistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_6 + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          crazed_woman_hp = 50;
        }
      }

      else if (my_current_threat === "young_girl") {
        addText(player_hit_array[6]);

        young_girl_hp = young_girl_hp - 80;

        if (young_girl_hp < 1) {
          addText("The young girl is now dead.");
          addText("You got a hammer from her remains.");

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[3];
          const inventory_pre_3 = inventory_pre_2.split("hammer=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "hammer=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_6 + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          young_girl_hp = 50;
        }
      }

      else if (my_current_threat === "teenager") {
        addText("The bullet causes the teenager to scream out in pain.");

        teenager_hp = teenager_hp - 80;

        if (teenager_hp < 1) {
          addText("The teenager is now dead.");
          addText("You got a carbine and a box of 9mm from the remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[5];
          const inventory_pre_3 = inventory_pre_2.split("carbine=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "carbine=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_6 + ";" + inventory_pre_1[6];
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          teenager_hp = 60;
        }
      }

      else {
        addText(player_hit_array[8]);

        evil_man_hp = evil_man_hp - 80;

        if (evil_man_hp < 1) {
          addText("The evil man is now dead.");
          addText("You got a machine pistol and a box of 9mm from his remains.");

          my_current_ammo = parseInt(my_current_ammo) + 5;
          localStorage.setItem("pgmh-ammo", my_current_ammo);

          const inventory_pre_1 = my_current_inventory.split(";");
          const inventory_pre_2 = inventory_pre_1[6];
          const inventory_pre_3 = inventory_pre_2.split("mpistol=");
          const inventory_pre_4 = inventory_pre_3[1];
          const inventory_pre_5 = String(parseInt(inventory_pre_4) + 1);
          const inventory_pre_6 = "mpistol=" + inventory_pre_5;

          my_current_inventory = inventory_pre_1[0] + ";" + inventory_pre_1[1] + ";" + inventory_pre_1[2] + ";" + inventory_pre_1[3] + ";" + inventory_pre_1[4] + ";" + inventory_pre_1[5] + ";" + inventory_pre_6;
          localStorage.setItem("pgmh-inventory", my_current_inventory);

          is_threat = false; 
          evil_man_hp = 150;
        }
      }
    }

    else {
      addText("The sound of the bullets echo throughtout the dark pharmacy.");
    }
  }

  else if (command_input.value.toLowerCase() === "key") {
    if (current_has_key === false) {
      addText("You don't have a key.");
      return false;
    }

    else {
      // PASS
    }

    if (current_description === "Several identical looking counters can be seen around your field of vision. They all seem to have several chairs around them. Comfy.") {
      addText("They key looks dark, and you can't find a place to use the key.");
    }

    else if (current_description === "There really isn't much to look at here. Just rows and rows of unmarked medicine. However, you can heal yourself if needed by using the MEDICINE command.") {
      addText("Where would you use a key on a shelf?");
    }

    else if (current_description === `The snacks aren't marked with any logos or brands, but their bright colors pop out at you and you can recognise more than a few of them. 
Type EAT to eat the snacks and replenish your hunger bar.`) {
      addText("You pop one of the snack bags with your key.");
    }

    else if (current_description === "The aisles of this area seem to never end, but somehow the toys in the aisles bring you comfort.") {
      addText("You see a locked toybox. The key turns, and the toy box opens. Inside, the words 'I hate having to work with arrays on the backend' can be seen etched into the bottom of the box.");
    }

    else if (current_description === "Office and school supplies are hung up on a cardboard display. There is also a hammer here as well. TAKE it perhaps?") {
      addText("You open some locks on display just for the fun of it.");
    }

    else if (current_description === "The electronics area is brightly lit up with blue light, and a burner phone can be seen with the words 'MODERN SOCIETY IS A DISEASE' displayed on its screen.") {
      addText("The various electronics around the area start to flicker with glee.");
    }

    else {
      addText("The door opens, and you're greeted with blinding lights...");
      $("#command-input").hide();

      setTimeout(function () {
        text_box.innerHTML = "";
        addText("You walk into a control room of a large warship.");
        
        setTimeout(function () {
          addText("Looking at the various displays tells you that the warship has been in space for a very, very, long time.");
          
          setTimeout(function () {
            addText("A log showed that various passengers had been picked up from multiple colonies over the years.");

            setTimeout(function () {
              addText("The pharmacy you were in was a malfunctioning holodeck program.");

              setTimeout(function () {
                addText("Some sicko had merged a combat program with a pharmacy simulation...");

                setTimeout(function () {
                  addText("Whatever. What you needed to do was to find your home. Wherever that was.");

                  setTimeout(function () {
                    addText("You take one of the escape pods in the room, and set a course for inhabited space.");

                    setTimeout(function () {
                      addText("The End.");
                    }, 5000);
                  }, 3000);
                }, 3000);
              }, 3000);
            }, 5000);
          }, 5000);
        }, 3000);
      }, 3000);
    }
  }

  else if (command_input.value.toLowerCase() === "distract") {
    if (is_threat === true) {
      addText("You can't distract an enemy when you yourself are in combat!");
    }

    else {
      fetch ("/distract", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          coords : my_current_loc
        })
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        throw error;
      });

      addText("You distracted the enemy. It simply goes off into the darknes.");
    }
  }

  else {
    addText("Error: No such command exists!");
  }
  
  checkIfNotPlayed();
  command_input.value = "";
  text_box.scrollTo(0, text_box.scrollHeight);
});

addText("Type HELP to return a list of commands.");
addText("Zurück in diese Ära.");

if (my_loc === "" || my_loc === null || my_loc === undefined) {
  current_description = `
You are in what looks to be a darkened pharmacy. A nearby cardboard cutout is holding a whiteboard, 
the original contents of which were hastily replaced by the words <i>'People Go Missing Here.'</i>
<br/><img src='/images/img1.png' width='450' height='300'/>
  `;
  my_current_loc = "000";
  localStorage.setItem("pgmh-myloc", my_current_loc);
}

else {
  function checkEncounters () {
    if (my_current_loc.charAt(1) === "0") {
      if (my_current_loc.charAt(2) === "0") {
        addText(sign_array[0]);
      }

      else if (my_current_loc.charAt(2) === "1") {
        addText(sign_array[1]);
      }

      else if (my_current_loc.charAt(2) === "2") {
        addText(sign_array[2]);
      }

      else if (my_current_loc.charAt(2) === "3") {
        addText(sign_array[3]);
      }

      else if (my_current_loc.charAt(2) === "4") {
        addText(sign_array[4]);
      }
    } 

    else {
      if (my_current_loc.charAt(2) === "0" || my_current_loc.charAt(2) === "3") {
        addText(death_array[0]);
      }

      else if (my_current_loc.charAt(2) === "1") {
        addText(death_array[1]);
      }

      else if (my_current_loc.charAt(2) === "2") {
        addText(death_array[2]);
      }

      else if (my_current_loc.charAt(2) === "3") {
        addText(death_array[3]);
      }

      else if (my_current_loc.charAt(2) === "4") {
        addText(death_array[4]);
      }
    }
  }

  if (my_current_loc.charAt(0) === "0") {
    addText(area_array[0]);
    current_description = area_array[0];
  }

  else if (my_current_loc.charAt(0) === "1") {
    addText(area_array[1]);
    current_description = area_array[1];
  }

  else if (my_current_loc.charAt(0) === "2") {
    addText(area_array[2]);
    current_description = area_array[2];
  }

  else if (my_current_loc.charAt(0) === "3") {
    addText(area_array[3]);
    current_description = area_array[3];
  }

  else if (my_current_loc.charAt(0) === "4") {
    addText(area_array[4]);
    current_description = area_array[4];
  }

  else if (my_current_loc.charAt(0) === "5") {
    addText(area_array[5]);
    current_description = area_array[5];
  }

  else if (my_current_loc.charAt(0) === "6") {
    addText(area_array[6]);
    current_description = area_array[6];
  }

  checkEncounters();
}

$(document).ready(function () {
  fetch ("/joins")
  .then(response => response.text())
  .then(data => {
    my_username = data; 
    playerAlert();
  })
  .catch(error => {
    addText(error);
  });
});

$("#nesucks").click(function () {
  window.open("https://nesucks.vercel.app/");
});