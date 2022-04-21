const express = require('express');
var outArray = [];
const router = express.Router();
const db = require('../db');
const val = require('../validation/customerVal');
const url = require('url');

// GET Methods
router.get('/customers', function (req, res) {
    const queryObject = url.parse(req.url,true).query; // Parse URL parameters into object
    if (queryObject.name !== undefined) { // If 'name' exists in params
        findCustomer(queryObject.name, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.json({
                customers: result
            });
        });
    }
    else { // If no params / no checked params are present
        getCustomers(function (err, result) {
            if (err) {
                console.log(err);
            }
            res.json({
                customers: result
            });
        });
    }
});

// POST Methods
router.post('/customers', function (req, res) {
    const queryObject = url.parse(req.url,true).query; // Parse URL parameters into object

});

// PUT Methods

// DELETE Methods

// Function Definitions
function getCustomers(callback) {

    var sql = "SELECT * FROM customer";

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

function findCustomer(name, callback) {
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

module.exports = router;