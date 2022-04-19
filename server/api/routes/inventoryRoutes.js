const { response } = require('express');
const express = require('express');
const router = express.Router();
const inventory = require('../services/inventoryService.js');

/* GET Current Inventory */
router.get('/', async function(req, res, next) {
  try {
    console.loginventory.getMultiple()()
    res.json(inventory.getMultiple());
  } catch (err) {
    console.error(`Error during GET: `, err.message);
    next(err);
  }
});

module.exports = router;