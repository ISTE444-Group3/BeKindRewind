var mysql = require('mysql'); 
var db = require('../db');

function checkName() {
    var sql = "SELECT * FROM customer WHERE LOWER( first_name ) LIKE LOWER( '" + name + "' ) OR last_name LIKE LOWER( '" + name + "') ";
    db.conn.query(sql, function (err, rows, fields) {
        if (!err) {
            if (rows) {
                callback(null, rows);
            }
        } else {
            callback(err, null);
            console.log('Error while performing Query.');
        }
    });
}

module.exports = {checkName}