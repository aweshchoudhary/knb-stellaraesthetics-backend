const router = require("express").Router();
const {
  createDealItem,
  getDealItemById,
  getDealItems,
  deleteDealItem,
  updateDealItem,
} = require("./DealItemController");

// ACTIVITY ENDPOINTS
router.post("/create", createDealItem);
router.get("/get-deal-item/:id", getDealItemById);
router.get("/get-deal-items", getDealItems);
router.put("/update/:id", updateDealItem);
router.delete("/delete/:id", deleteDealItem);

module.exports = router;
