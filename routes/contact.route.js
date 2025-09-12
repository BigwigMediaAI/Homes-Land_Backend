const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  deleteContact,
} = require("../controller/contact.controller");

// POST /api/contacts - create a new contact
router.post("/", createContact);

// GET /api/contacts - get all contacts
router.get("/", getContacts);

// DELETE /api/contacts/:id - delete a contact by ID
router.delete("/:id", deleteContact);

module.exports = router;
