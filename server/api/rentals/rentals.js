const express = require('express');
const router = express.Router();
const db = require('../db');
const url = require('url');

// GET Methods
router.get('/rentals', function (req, res) {

    const queryObject = url.parse(req.url,true).query; // Parse URL parameters into object
    if (queryObject.name !== undefined) { // If 'name' exists in params
        getRentalsByName(queryObject.name, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.json({
                rentals: result
            });
        });
    }
    else {
        getRentals(function (err, result) {
            if (err) {
                console.log(err);
            }
            res.json({
                rentals: result
            });
        });
    }    
});

// POST Methods
router.post('/rentals', function (req, res) {

    const queryObject = url.parse(req.url,true).query; // Parse URL parameters into object
    var len = Object.keys(queryObject).length;
    if (len == 3) {
        newRental(queryObject.customer_id, queryObject.item_id, queryObject.notes, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.json({
                affectedRows: result[0].affectedRows
            });
        });
    }
    else {
        res.status(400).json({
            "error": "POST: None or Too Few Parameters Sent"
          });
    }

});

// Function Definitions
function getRentals(callback) {

    var sql = `SELECT CONCAT(c.last_name,", ",c.first_name) as customer_name, ii.movie_title, imt.item_media_description, cir.rental_date_out, cir.rental_date_due, cir.rental_date_returned
        FROM bekindrewind.customer_item_rental cir
        JOIN bekindrewind.customer c on cir.customer_id=c.customer_id
        join bekindrewind.inventory_items ii on cir.item_id=ii.item_id
        join bekindrewind.inventory_media_types imt on ii.media_code = imt.item_media_code`;

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

function getRentalsByName(name, callback) {

    var sql = `SELECT CONCAT(c.last_name,", ",c.first_name) as customer_name, ii.movie_title, imt.item_media_description, cir.rental_date_out, cir.rental_date_due, cir.rental_date_returned
        FROM bekindrewind.customer_item_rental cir
        JOIN bekindrewind.customer c on cir.customer_id=c.customer_id
        join bekindrewind.inventory_items ii on cir.item_id=ii.item_id
        join bekindrewind.inventory_media_types imt on ii.media_code = imt.item_media_code WHERE LOWER( c.first_name ) LIKE LOWER( "`+ name +`" ) OR LOWER( c.last_name ) LIKE LOWER( "`+ name +`" )`;
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

function newRental(customer_id, item_id, notes, callback) {
    let sql =`BEGIN;
        INSERT INTO customer_item_rental VALUES (null, ` + parseInt(customer_id) + `, ` + parseInt(item_id) + `, now(), date_add(now(), INTERVAL 5 DAY), null, 0, "` + notes + `");
        SET @v1 = (SELECT inventory_items.number_in_stock-1  FROM inventory_items WHERE inventory_items.item_id = ` + parseInt(item_id) + `);
        UPDATE inventory_items SET inventory_items.number_in_stock = @v1 WHERE inventory_items.item_id = ` + parseInt(item_id) + `;
        COMMIT;`
          
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