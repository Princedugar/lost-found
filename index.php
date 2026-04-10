<?php
$conn = new mysqli("localhost","root","","lostfound");

$lost = $conn->query("SELECT * FROM items WHERE type='lost'");
$found = $conn->query("SELECT * FROM items WHERE type='found'");
$all = $conn->query("SELECT * FROM items ORDER BY id DESC");
?>

<!DOCTYPE html>
<html>
<head>
<title>Unknown Registry</title>

<style>

body{
font-family:Arial;
margin:0;
background:#f4f6f9;
}

header{
background:#0d6efd;
color:white;
padding:20px;
text-align:center;
}

nav{
text-align:center;
margin-top:10px;
}

nav button{
padding:10px 20px;
margin:5px;
border:none;
background:white;
color:#0d6efd;
font-weight:bold;
border-radius:6px;
cursor:pointer;
}

.container{
width:90%;
margin:auto;
margin-top:30px;
}

.card{
background:white;
padding:20px;
border-radius:10px;
box-shadow:0 3px 10px rgba(0,0,0,0.1);
margin-bottom:20px;
}

input,textarea,select{
width:100%;
padding:10px;
margin-top:10px;
border:1px solid #ccc;
border-radius:5px;
}

button.submit{
background:#0d6efd;
color:white;
border:none;
padding:12px;
width:100%;
margin-top:10px;
border-radius:5px;
cursor:pointer;
}

.items{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
}

.item{
background:white;
padding:15px;
border-radius:10px;
box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

.item img{
width:100%;
height:150px;
object-fit:cover;
border-radius:5px;
}

table{
width:100%;
border-collapse:collapse;
background:white;
}

table th, table td{
border:1px solid #ddd;
padding:10px;
text-align:center;
}

table th{
background:#0d6efd;
color:white;
}

</style>

</head>

<body>

<header>
<h1>Unknown Registry</h1>
<p>College Lost & Found System</p>

<nav>
<button onclick="showPage('home')">Home</button>
<button onclick="showPage('report')">Report Item</button>
<button onclick="showPage('lost')">Lost Items</button>
<button onclick="showPage('found')">Found Items</button>
<button onclick="showPage('data')">Saved Data</button>
</nav>

</header>

<div class="container">

<!-- HOME -->

<div id="home" class="page card">
<h2>Welcome</h2>
<p>This system helps students report and find lost items.</p>
</div>

<!-- REPORT -->

<div id="report" class="page card" style="display:none">

<h2>Report Item</h2>

<form action="save.php" method="POST" enctype="multipart/form-data">

<select name="type">
<option value="lost">Lost Item</option>
<option value="found">Found Item</option>
</select>

<input type="text" name="name" placeholder="Item Name" required>

<textarea name="description" placeholder="Description"></textarea>

<input type="text" name="location" placeholder="Location">

<input type="text" name="contact" placeholder="Contact Number">

<input type="file" name="image">

<button class="submit">Submit</button>

</form>

</div>

<!-- LOST ITEMS -->

<div id="lost" class="page" style="display:none">

<h2>Lost Items</h2>

<div class="items">

<?php
while($row=$lost->fetch_assoc()){
?>

<div class="item">
<img src="uploads/<?php echo $row['image']; ?>">
<h3><?php echo $row['name']; ?></h3>
<p><?php echo $row['description']; ?></p>
<p><b>Location:</b> <?php echo $row['location']; ?></p>
<p><b>Contact:</b> <?php echo $row['contact']; ?></p>
</div>

<?php } ?>

</div>
</div>

<!-- FOUND ITEMS -->

<div id="found" class="page" style="display:none">

<h2>Found Items</h2>

<div class="items">

<?php
while($row=$found->fetch_assoc()){
?>

<div class="item">
<img src="uploads/<?php echo $row['image']; ?>">
<h3><?php echo $row['name']; ?></h3>
<p><?php echo $row['description']; ?></p>
<p><b>Location:</b> <?php echo $row['location']; ?></p>
<p><b>Contact:</b> <?php echo $row['contact']; ?></p>
</div>

<?php } ?>

</div>
</div>

<!-- ALL DATA PAGE -->

<div id="data" class="page" style="display:none">

<h2>All Saved Data</h2>

<table>

<tr>
<th>ID</th>
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Location</th>
<th>Contact</th>
<th>Image</th>
</tr>

<?php
while($row=$all->fetch_assoc()){
?>

<tr>
<td><?php echo $row['id']; ?></td>
<td><?php echo $row['type']; ?></td>
<td><?php echo $row['name']; ?></td>
<td><?php echo $row['description']; ?></td>
<td><?php echo $row['location']; ?></td>
<td><?php echo $row['contact']; ?></td>
<td><img src="uploads/<?php echo $row['image']; ?>" width="60"></td>
</tr>

<?php } ?>

</table>

</div>

</div>

<script>

function showPage(page){

var pages=document.querySelectorAll(".page");

pages.forEach(function(p){
p.style.display="none";
});

document.getElementById(page).style.display="block";

}

</script>

</body>
</html>