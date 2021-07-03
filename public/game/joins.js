// Handle player joins and leaves 

let join_slot = "";
let leave_slot = "";
let chat_slot = "";
let camp_slot = "";

const socket = io();

setInterval(function () {
  fetch ("/joins")
  .then(response => response.text())
  .then(data => {
    if (data === join_slot) {
      // PASS 
    }

    else {
      join_slot = data;
      addText(join_slot + " entered the aisles.");
      text_box.scrollTo(0, text_box.scrollHeight);
    }
  })
  .catch(error => {
    addText(error);
    text_box.scrollTo(0, text_box.scrollHeight);
  });

  fetch ("/leaves")
  .then(response => response.text())
  .then(data => {
    if (data === leave_slot) {
      // PASS 
    }

    else {
      leave_slot = data; 
      addText(leave_slot);
      text_box.scrollTo(0, text_box.scrollHeight);
    }
  })
  .catch(error => {
    addText(error);
    text_box.scrollTo(0, text_box.scrollHeight);
  });

  // Handle chatroom data

  fetch ("/chat")
  .then(response => response.text())
  .then(data => {
    if (data === chat_slot) {
      // PASS
    }

    else {
      chat_slot = data;
      addText(chat_slot);
      text_box.scrollTo(0, text_box.scrollHeight);
    }
  })
  .catch(error => {
    addText(error);
    text_box.scrollTo(0, text_box.scrollHeight);
  });

  // Handle player campsites 

  fetch ("/camp")
  .then(response => response.text())
  .then(data => {
    if (data === camp_slot) {
      // PASS 
    }

    else {
      camp_slot = data;
      addText("Campsite made at coordinates " + camp_slot + ".");
      text_box.scrollTo(0, text_box.scrollHeight);
    }
  })
  .catch(error => {
    addText(error);
    text_box.scrollTo(0, text_box.scrollHeight);
  });
}, 500);