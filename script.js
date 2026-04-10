// 🔔 NOTIFICATION SYSTEM
if ("Notification" in window){
  Notification.requestPermission();
}

function showNotification(title, message){
  if(Notification.permission === "granted"){
    new Notification(title, { body: message });
  }
}

// 🔍 MATCH CHECK (Found → Lost)
function checkMatch(itemName){
  let lostItems = document.querySelectorAll("#lostList .item-card");

  lostItems.forEach(card => {
    let text = card.innerText.toLowerCase();

    if(text.includes(itemName.toLowerCase())){
      showNotification("Item Found 🎉", "Your lost item '" + itemName + "' has been found!");
    }
  });
}



// CREATE UNIQUE USER ID FOR EACH USER
let userId = localStorage.getItem("userId");

if(!userId){
  userId = "user_" + Math.random().toString(36).substr(2,9);
  localStorage.setItem("userId", userId);
}


// PAGE SWITCHING
function showPage(id) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}



// LOST ITEM SUBMIT
document.getElementById("lostForm").addEventListener("submit", function(e){

  e.preventDefault();

  let name = document.getElementById("lostName").value;
  let email = document.getElementById("lostEmail").value;
  let desc = document.getElementById("lostDesc").value;
  let contact = document.getElementById("lostContact").value;
  let location = document.getElementById("lostLocation").value;

  let imageInput = document.getElementById("lostImage");

  let reader = new FileReader();

  reader.onload = function(){

    // 🔔 LOST NOTIFICATION
    showNotification("Lost Item Reported ⚠️", "A new lost item has been added: " + name);

    let card = document.createElement("div");
    card.className = "item-card";

    card.dataset.owner = userId;

    card.innerHTML = `
      <img src="${reader.result}">
      <h3>${name}</h3>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Description:</strong> ${desc}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Location:</strong> ${location}</p>
      <button class="deleteBtn">Delete</button>
    `;

    let deleteBtn = card.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function(){

      if(card.dataset.owner === userId){
        card.remove();
      }else{
        alert("Only the person who added this item can delete it.");
      }

    });

    document.getElementById("lostList").appendChild(card);
  };

  if(imageInput.files[0]){
    reader.readAsDataURL(imageInput.files[0]);
  }

  this.reset();

});



// FOUND ITEM SUBMIT
document.getElementById("foundForm").addEventListener("submit", function(e){

  e.preventDefault();

  let name = document.getElementById("foundName").value;
  let email = document.getElementById("foundEmail").value;
  let desc = document.getElementById("foundDesc").value;
  let contact = document.getElementById("foundContact").value;
  let location = document.getElementById("foundLocation").value;

  let imageInput = document.getElementById("foundImage");

  let reader = new FileReader();

  reader.onload = function(){

    // 🔔 FOUND NOTIFICATION (for everyone)
    showNotification("New Item Found 🔍", "A new found item has been added: " + name);

    // 🔔 MATCH CHECK
    checkMatch(name);

    let card = document.createElement("div");
    card.className = "item-card";

    card.dataset.owner = userId;

    card.innerHTML = `
      <img src="${reader.result}">
      <h3>${name}</h3>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Description:</strong> ${desc}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Location:</strong> ${location}</p>
      <button class="deleteBtn">Delete</button>
    `;

    let deleteBtn = card.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function(){

      if(card.dataset.owner === userId){
        card.remove();
      }else{
        alert("Only the person who added this item can delete it.");
      }

    });

    document.getElementById("foundList").appendChild(card);
  };

  if(imageInput.files[0]){
    reader.readAsDataURL(imageInput.files[0]);
  }

  this.reset();

});