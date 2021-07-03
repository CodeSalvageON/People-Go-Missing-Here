// In-game objects that the player will most likely encounter 

// Location system 
const my_loc = localStorage.getItem("pgmh-myloc");
const my_inventory = localStorage.getItem("pgmh-myinventory");

const counter_distance = 10;
const main_distance = 20;
const toy_distance = 10;
const tools_distance = 5;
const electronics_distance = 10;
const checkout_distance = 10;

let taken_item = false;
let is_threat = false;
let loc_number = 0;
const locations = ["counter", "main", "snacks", "toys", "tools", "electronics", "checkout"]; // Determine what location the player is currently in

// Signs and posters
const sign_array = ["In front of you is a poster advertising a form of medicine- the side effects include...cancer?!!", "An area with several crumpled up cardboard cutouts can be seen in front of you.", "A cheerful looking woman can be seen on a large overhanging sign: she says that escape can only be achieved through death.", "A broken sign litters your path. It has several slash marks and a puddle of blood can be seen beneath it.", "You see a bulletin board with 5 missing posters pinned to it."];

// Bodies
const death_array = [`On the floor, there lies the rotting body of a boy clutching what looks to be a white box shaped gaming console. 
It has several bullet holes in it, along with the body.`, "A corpse is hanging on the ceiling above you.", "Bones litter the shelves of a makeshift cage made out of many shelves. Whatever was kept in there has long since died.", "A partially decomposing skull has been placed on a skewer above a long-gone DIY fireplace. Did someone try to cook and eat a human head?", "A bloody pile of rags and bones occupies the top of one of the shelves."];

// Area Descriptions 
const area_array = ["Several identical looking counters can be seen around your field of vision. They all seem to have several chairs around them. Comfy.", "There really isn't much to look at here. Just rows and rows of unmarked medicine. However, you can heal yourself if needed by using the MEDICINE command.", `The snacks aren't marked with any logos or brands, but their bright colors pop out at you and you can recognise more than a few of them. 
Type EAT to eat the snacks and replenish your hunger bar.`, "The aisles of this area seem to never end, but somehow the toys in the aisles bring you comfort.", "Office and school supplies are hung up on a cardboard display. There is also a hammer here as well. TAKE it perhaps?", "The electronics area is brightly lit up with blue light, and a burner phone can be seen with the words 'MODERN SOCIETY IS A DISEASE' displayed on its screen.", "This is the checkout area, you see a door....but you need to use a key."];

// Items and their descriptions 
const item_array = ["A bottle of medicine. It's unmarked, but you have a feeling it will do its job well.", "A hammer. Not as good as a firearm, but it will do.", "A box of snacks and soda. It will keep you on the move.", "A dead burner phone. Why do you need this?", "A stuffed toy. Amusing.", "A PL-14 pistol. An elegant weapon.", "A Kel-Tec Sub-2000 carbine. Portable and easy to use.", "A 93R machine pistol. Fancy.", "A silver key. It looks nice.", "A wrinkled box containing 10 9x19mm rounds.", "A bloody skewer. Something about it is nasty."];

// How you find items
const item_finds_array = ["Wait, there's something here! It's a pistol of sorts...use TAKE to take the pistol.", "Wait, there's something here! It's a carbine of sorts...use TAKE to take the carbine.", "Wait, there's something here! It's a complicated pistol of sorts...use TAKE to take the machine pistol.", "Wait, there's something here! It's a key of sorts...use TAKE to take the key.", "Wait, there's something here! It's a box of ammo of sorts...use TAKE to take the box of ammo."];

// Taking items 
const item_takes_array = ["You take a bottle of medicine from the shelves.", "You take the hammer from it's place on the shelves.", "You take a box of snacks and soda and place it into your parcel.", "You unplug the burner phone and take it with you. It's useless now.", "You grab a stuffed toy from the shelves.", "Hesitantly, you pull the skewer from the human head and take it with you."];

// Enemies and their descriptions
const enemy_array = ["Standing in front of you is a malnourished looking man with a bloody skewer in his hand. He looks dangerous.", "A crazed woman points a pistol in your direction. She looks determined to kill you.", "A young girl clutches a stuffed toy in one hand. In the other, is a hammer.", "Covered in blood, a disraught looking teenager points a cheap carbine at you.", "Blocking your path is an evil looking man pointing a machine pistol in your direction."];

// Enemy attacks
const enemy_attack_array = ["The man lunges forward with his bloody skewer.", "The woman fires a couple rounds at you.", "The young girl swings her hammer in your direction.", "The teenager shoots his gun at you.", "The man lets out a volley of shots in your direction."];

// Enemy attacks (when they hit the player)
const enemy_hit_array = ["The skewer is plunged into your chest. You feel blood drain from you.", "A bullet hits you. You're losing blood.", "The hammer hits you hard. The pain is almost unbearable.", "A well placed bullet knocks you backwards.", "You feel several rounds hit your body."];

// Player attacks 
const player_attack_array = ["You lunge forward with the bloody skewer.", "You swing the hammer violently.", "You fire a shot.", "You aim the carbine and fire.", "You spray a line of bullets."];

// Player attacks (when they hit the enemy)
const player_hit_array = ["The skewer is plunged into the man's chest. You hear him scream out in pain.", "The skewer impales the woman. She lets out a blood-curdling scream.", "The skewer stabs into the young girl. She's dead.", "The skewer goes through the man's body. However, he doesn't seem to notice.", "The bullet hits the man and he falls back.", "The bullet hits the woman in the stomach. She's bleeding a lot.", "The bullet reduces the young girl to a mess of blood and guts.", "The bullet knocks the teenager to the ground.", "The bullet hits the man, but he doesn't seem to care.", "The hammer sends the man flying across the aisle.", "The hammer knocks the woman to the ground.", "The hammer splits the girl's head in two.", "The hammer causes the teenager to stumble.", "The hammer bounces against the man's body, but he doesn't seem to care."];