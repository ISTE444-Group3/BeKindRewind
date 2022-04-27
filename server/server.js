const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const cors = require('cors');

// Route Definitions
const auth = require("./authentication/auth");
const register = require("./authentication/register");
const login = require("./authentication/login");

const rentals = require("./api/rentals/rentals");
const inventory = require("./api/inventory/inventory");
const customers = require("./api/customers/customers");

const FileStreamRotator = require('file-stream-rotator')
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

var logDirectory = path.join(__dirname, 'log');
// create a write stream (in append mode)
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, '%DATE%-access.log'),
  frequency: 'daily',
  verbose: false
});

morgan.token('username', function (req, res) { 
  var username ='USER: '+ req.headers['username']==''?'Null':req.headers['username'];
  //var username = req.user ? req.user.username: "Guest";
  return username;
});
// setup the logger
//app.use(morgan('combined', {stream: accessLogStream}));
app.use(morgan(':date[iso] - :username   ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',{stream: accessLogStream}));


// CORS Definitions
const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];

app.use(cors({
  origin: function(origin, callback){    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) {
      return callback(null, true);
    }
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }    return callback(null, true);
  }
}));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});


// Path Definitions
app.post("/register", register);
app.post("/login", login);

app.get("/rentals", auth, rentals);
app.post("/rentals", auth, rentals);

app.get("/inventory", auth, inventory);
app.post("/inventory", auth, inventory);
app.put("/inventory", auth, inventory);
app.delete("/inventory", auth, inventory);

app.get("/customers", auth, customers);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});