// Server
// Downloads and settings start here

const fs = require('fs');
const express = require('express');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const io = require('socket.io')(http);
const sanitizer = require('sanitizer');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Google Firestore

const {
	type,
	project_id,
	private_key_id,
	private_key,
	client_email,
	client_id,
	auth_uri,
	token_uri,
	auth_provider_x509_cert_url,
	client_x509_cert_url
} = process.env;

const serviceAccount = {
	type,
	project_id,
	private_key_id,
	private_key,
	client_email,
	client_id,
	auth_uri,
	token_uri,
	auth_provider_x509_cert_url,
	client_x509_cert_url
};

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Player joins and leaves

let player_joined = "";
let player_left = "";

// Player chats and coords 

let player_chat = "";
let player_coords = "";
let player_at_coords = "";
let player_coord_array = [];
let player_distract = "";

io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);
  
  player_joined = "Wanderer " + socket.id;

  socket.on('disconnect', function() {
    console.log('User disconnected.');
    
    player_left = "Wanderer " + socket.id + " went missing.";

    for (i = 0; i < player_coord_array.length; i++) {
      if (player_coord_array[i].includes(socket.id)) {
        const player_string_array = JSON.stringify(player_coord_array);
        const new_string_array = JSON.stringify(player_string_array.replace(player_string_array, "missing"));

        player_coord_array = JSON.parse(new_string_array);
      }

      else {
        // PASS
      }
    }
  });
});

// Routes

// GET 

app.get("", function (req, res) {
  const main_page = __dirname + "/public/static/index.html";

  res.sendFile(main_page);
});

app.get("/joins", function (req, res) {
  res.send(player_joined);
});

app.get("/leaves", function (req, res) {
  res.send(player_left);
});

app.get("/chat", function (req, res) {
  res.send(player_chat);
});

app.get("/camp", function (req, res) {
  res.send(player_coords);
});

app.get("/coords", function (req, res) {
  res.send(player_at_coords);
});

app.get("/get-array", function (req, res) {
  res.send(JSON.stringify(player_coord_array));
});

app.get("/distract", function (req, res) {
  res.send(player_distract);
});

// POST 

app.post("/chat", function (req, res) {
  const username = req.body.username;
  const message = req.body.message; 
  
  player_chat = sanitizer.escape(username + ": " + message);
  res.send("success"); 
});

app.post("/camp", function (req, res) {
  const coords = req.body.coords; 

  player_coords = sanitizer.escape(coords);
  res.send("success");
});

app.post("/coords", function (req, res) {
  const username = req.body.username;
  const coords = req.body.coords;

  player_username = sanitizer.escape(username);
  player_coords = sanitizer.escape(coords);

  player_at_coords = player_username + "||" + player_coords;
  res.send("success");
});

app.post("/post-array", function (req, res) {
  const user = req.body.username; 
  const coord = req.body.coords;

  let condition_user = false;

  for (i = 0; i < player_coord_array.length; i++) {
    if (player_coord_array[i].includes(user)) {
      condition_user = true;

      const i_array = player_coord_array[i].split("||");
      const i_array_1 = i_array[0];
      const i_array_2 = i_array[1];

      const player_string_array = JSON.stringify(player_coord_array);
      const parse_player_string_array = JSON.parse(player_string_array.replace(player_coord_array[i], i_array_1 + "||" + coord));

      player_coord_array = parse_player_string_array;
    }

    else {
      // PASS
    }
  }

  if (condition_user === true) {
    // PASS
  }

  else {
    player_coord_array.push(user + "||" + coord);
  }

  res.send("success");
});

app.post("/distract", function (req, res) {
  const coords = req.body.coords;

  player_distract = coords;
  
  res.send("success");
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});