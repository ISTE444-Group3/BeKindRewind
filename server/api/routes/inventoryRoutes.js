const express = require('express');
const router = express.Router();
const inventory = require('../services/inventoryService.js');

/* GET Current Inventory */
router.get('/', async function(req, res, next) {
  try {
    res.json(await inventory.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error during GET: `, err.message);
    next(err);
  }
});

module.exports = router;