const express = require('express');
var outArray = [];
const router = express.Router();
const db = require('../db');
const url = require('url');

// GET Methods
router.get('/inventory', function (req, res) {
    const queryObject = url.parse(req.url,true).query; // Parse URL parameters into object
    if (queryObject.name !== undefined) {
        getInventoryByName(queryObject.name, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.json({
                inventory: result
            });
        });
    }
    else {
        getInventory(function (err, result) {
            if (err) {
                console.log(err);
            }
            res.json({
                inventory: result
            });
        });
    }
});

// POST Methods
router.post('/inventory', function (req, res) {
    const queryObject = url.parse(req.url,true).query; // Parse URL parameters into object
    var len = Object.keys(queryObject).length;

    if (len == 4) {
        newInventory(queryObject.media_code, queryObject.movie_title, queryObject.number_in_stock, queryObject.rental_rate, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.json({
                insertId: result.insertId
            });
        });
    }
    else {
        res.send("POST: No or Too Few Parameters Sent, Try Again");
    }
});

// PUT Methods

// DELETE Methods
router.delete('/inventory', function (req, res){
    const queryObject = url.parse(req.url,true).query; // Parse URL parameters into object
    var len = Object.keys(queryObject).length;

    if (len > 0) {
        if (queryObject.movie_title !== undefined) {
            deleteInventoryName(queryObject.movie_title, function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.json({
                    rowsDeleted: result.affectedRows
                });
            });
        }
        else if (queryObject.item_id !== undefined) {
            deleteInventoryID(queryObject.item_id, function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.json({
                    rowsDeleted: result.affectedRows
                });
            });
        }
        else {
            res.send("DELETE: No or Too Few Parameters Sent, Try Again");
        }
    }
    else {
        res.send("DELETE: No or Too Few Parameters Sent, Try Again");
    }
});

// Function Definitions
function getInventory(callback) {

    var sql = `SELECT * FROM inventory_items`;

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

function getInventoryByName(name, callback) {

    var sql = `SELECT * FROM inventory_items WHERE LOWER( movie_title ) LIKE LOWER( ? )`;

    db.conn.query(sql, [ name ], function (err, rows, fields) {
        console.log(sql);
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

function newInventory(media_code, movie_title, number_in_stock, rental_rate, callback) {
    let sql = "INSERT INTO inventory_items (media_code, movie_title, number_in_stock, rental_rate) VALUES (?, ?, ?, ?);";

    db.conn.query(sql, [ media_code, movie_title, number_in_stock, rental_rate ], function (err, rows, fields) {
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

function updateInventory() {

}

function deleteInventoryName(name, callback) {
    var sql = "DELETE FROM inventory_items WHERE movie_title = ?";

    db.conn.query(sql, [ name ], function (err, rows, fields) {
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

function deleteInventoryID(id, callback) {
    id = parseInt(id);
    var sql = "DELETE FROM inventory_items WHERE item_id = '?'";

    db.conn.query(sql, [ id ], function (err, rows, fields) {
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