const router = require("express").Router();
const {
  getDeal,
  createDeal,
  deleteDeal,
  updateDeal,
  updateDealStage,
  getDeals,
} = require("../controllers/deal_controller");

// CARD ENDPOINTS
router.get("/get-deal/:id", getDeal);
router.get("/get-deals", getDeals);
router.post("/add", createDeal);
router.delete("/delete/:id", deleteDeal);
router.put("/update/:id", updateDeal);
router.put("/deal-stage", updateDealStage);

module.exports = router;
