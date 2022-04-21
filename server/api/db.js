var mysql = require('mysql'); 

var conn = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "bkrAdmin",
  password: "BeKindRewindG003",
  database: "bekindrewind",
  port: 3306
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = {
  conn
}