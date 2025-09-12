const express = require("express");
const router = express.Router();
const sellController = require("../controller/AdminApproval");

// Approve a Sell entry
router.post("/approve/:id", sellController.approveSell);

module.exports = router;
