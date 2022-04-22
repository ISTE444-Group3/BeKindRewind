const express = require('express');
const router = express.Router();
const db = require('../api/db');
const url = require('url');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
require("dotenv").config();

router.post('/login', async function (req, res) {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        var user;
        findOne(email, function (err, result) {
            if (err) {
                console.log(err);
            }
            user = result[0];

            if (user && (bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "24h",
                    }
                );

                // save user token
                user.token = token;

                // user
                res.status(201).json(user);
            }
            else {
                res.status(400).send("Invalid Credentials");
            }
        });
        
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

function findOne(email, callback) {
    var sql = 'SELECT * FROM user WHERE email = "' + email + '";';

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