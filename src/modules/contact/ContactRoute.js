const router = require("express").Router();

const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("./ContactController");

// CLIENT ENDPOINTS
router.post("/add", createContact);
router.put("/update/:id", updateContact);
router.delete("/delete/:id", deleteContact);
router.get("/get-contacts", getContacts);
router.get("/get-contact/:id", getContactById);

module.exports = router;
