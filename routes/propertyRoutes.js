const express = require("express");
const router = express.Router();
const buyController = require("../controller/propertyController");

//Add a new property for sale (with images/videos upload)
router.post("/add", buyController.createBuyProperty);

//Get all properties for sale
router.get("/buy", buyController.getAllBuyProperties);

// Get single property by title slug
router.get("/buy/title/:titleSlug", buyController.getBuyPropertyByTitle);

//Delete property by ID
router.delete("/buy/:id", buyController.deleteBuyProperty);

module.exports = router;
