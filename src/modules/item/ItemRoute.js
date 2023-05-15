const router = require("express").Router();
const {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} = require("./ItemController");
const upload = require("../../apps/multer");

// ACTIVITY ENDPOINTS
router.post("/create", upload.single("image"), createItem);
router.get("/get-item/:id", getItemById);
router.get("/get-items", getItems);
router.put("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);

module.exports = router;
