const router = require("express").Router();
const {
  getDeal,
  createDeal,
  deleteDeal,
  updateDeal,
  updateDealStage,
  getDeals,
} = require("./DealController");

// CARD ENDPOINTS
router.get("/get-deal/:id", getDeal);
router.get("/get-deals", getDeals);
router.post("/add", createDeal);
router.delete("/delete/:id", deleteDeal);
router.put("/update/:id", updateDeal);
router.put("/deal-stage", updateDealStage);

module.exports = router;
