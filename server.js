// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For styling, looking for file called public 
app.use(express.static("public"))

// Reservations (DATA)
// =============================================================
var reservations = [
  {
    customerName: "sophia",
    customerPhone: "9999999999",
    customerEmail: "sophia@test.com",
    customerID: 1
  },
  {
    customerName: "mercury",
    customerPhone: "1111111111",
    customerEmail: "mercury@test.com",
    customerID: 2
  }
];

var waitlist = [
    {
        customerName: "ann",
        customerPhone: "55555555555",
        customerEmail: "ann@test.com",
        customerID: 3
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
    // res.send("Home Page")
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
    // res.send("Tables Page")
});

app.get("/form", function(req, res) {
  res.sendFile(path.join(__dirname, "form.html"));
    // res.send("Reservation Page")
});

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

// Displays waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  console.log(newTable);

  if(reservations.length < 5) {
    reservations.push(newTable);
  }
  else {
      waitlist.push(newTable)
  }
  
  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});