var mysql = require('mysql'); 

var con = mysql.createConnection({
    host: "localhost",
    user: "bkrAdmin",
    password: "BeKindRewindG003",
    database: "bekindrewind",
    port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = {
  con
}

