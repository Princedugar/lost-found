<!DOCTYPE html>
<html>
<head>
    <title>Hostel Management</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

<!-- HERO SECTION -->
<section class="hero">
    <h1>🏨 Welcome to Hostel Management</h1>
    <p>Manage Rooms, Guests & Billing Easily</p>
    <button onclick="enterApp()">Get Started</button>
</section>

<!-- MAIN APP (Hidden First) -->
<div class="app" id="app">

    <header>
        <h2>Dashboard</h2>
    </header>

    <!-- CARDS -->
    <div class="cards">
        <div class="card">👤 Guests <span id="totalGuests">0</span></div>
        <div class="card">💰 Revenue ₹ <span id="totalRevenue">0</span></div>
        <div class="card">🛏 Rooms <span id="roomsUsed">0</span></div>
    </div>

    <!-- FORM -->
    <div class="form-box">
        <h3>Check-In Guest</h3>

        <input type="text" id="name" placeholder="Guest Name">
        <input type="number" id="room" placeholder="Room Number">
        <input type="number" id="days" placeholder="Days">
        <input type="number" id="nights" placeholder="Nights">

        <select id="roomType">
            <option value="">Room Type</option>
            <option value="Single">Single ₹500</option>
            <option value="Double">Double ₹800</option>
            <option value="Deluxe">Deluxe ₹1200</option>
        </select>

        <button onclick="addGuest()">Check-In</button>
    </div>

    <!-- TABLE -->
    <div class="table-box">
        <h3>Guest Records</h3>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Room</th>
                    <th>Total ₹</th>
                </tr>
            </thead>
            <tbody id="recordTable"></tbody>
        </table>
    </div>

</div>

<script src="script.js"></script>
<h2>Total Revenue: ₹ <span id="totalBill">0</span></h2>

</body>
</html>
