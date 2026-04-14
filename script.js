function showPage(page){
document.querySelectorAll('.container').forEach(c=> c.classList.remove("active"));
document.getElementById(page).classList.add("active");
if(page==="items"){ displayItems(); }
}

function saveLost(){

if(lostContact.value.length!=10){
alert("Enter valid number");
return;
}

let location = lostLocation.value.trim()==="" ? "Unknown" : lostLocation.value;

let file=lostImage.files[0];
let reader=new FileReader();

reader.onload=function(){

let data={
type:"Lost",
name:lostName.value,
email:lostEmail.value,
item:lostItem.value,
desc:lostDesc.value,
location:location,
contact:lostContact.value,
image:reader.result
}

saveData(data);
alert("Saved!");
}

if(file){
reader.readAsDataURL(file)
}else{
reader.onload()
}
}

function saveFound(){

if(foundContact.value.length!=10){
alert("Enter valid number");
return;
}

let file=foundImage.files[0];
let reader=new FileReader();

reader.onload=function(){

let data={
type:"Found",
name:foundName.value,
email:foundEmail.value,
item:foundItem.value,
desc:foundDesc.value,
location:foundLocation.value,
contact:foundContact.value,
image:reader.result
}

saveData(data);
alert("Saved!");
}

if(file){
reader.readAsDataURL(file)
}else{
reader.onload()
}
}

function saveData(data){
let items=JSON.parse(localStorage.getItem("items"))||[];
items.push(data);
localStorage.setItem("items",JSON.stringify(items));
displayItems();
}

function deleteItem(index){
let items=JSON.parse(localStorage.getItem("items"))||[];
items.splice(index,1);
localStorage.setItem("items",JSON.stringify(items));
displayItems();
}

function displayItems(){

let items=JSON.parse(localStorage.getItem("items"))||[];
let html="";

items.forEach((i,index)=>{

html+=`
<div class="item">
<b>${i.type} Item</b><br><br>
<img src="${i.image}">
<p><b>Name:</b> ${i.name}</p>
<p><b>Email:</b> ${i.email}</p>
<p><b>Item:</b> ${i.item}</p>
<p><b>Description:</b> ${i.desc}</p>
<p><b>Location:</b> ${i.location}</p>
<p><b>Contact:</b> ${i.contact}</p>
<button onclick="deleteItem(${index})">Delete</button>
</div>
`
});

itemsList.innerHTML=html;
}
