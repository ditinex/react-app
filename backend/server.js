// FileName: server.js
// Import modules
const express = require('express')
const bodyParser = require('body-parser')
const https = require("https")
const http = require("http")

// Initialize the app
const app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Setup server port [SERVER WILL BE CONNECTED AT PORT 9090 BY DEFAULT]
const port = process.env.PORT || 9090;
const ssl_port = process.env.PORT || 9090;
//SSL CERT FILES
const options = {
  //key: fs.readFileSync("/etc/letsencrypt/live/privkey.pem"),
  //cert: fs.readFileSync("/etc/letsencrypt/live/fullchain.pem")
};


//https server
const server = http.createServer(options, app).listen(port, function () {
     console.log("Running Backend on port " + port);
});


// Setting up routes
require('./router')(app);

// Setting up Socket Routes/Namespace
//require('./socket')(io);

// Default for undefined routes
app.use((req, res, next) => {
  res.json({"error": "Content Unavailable"});
});
