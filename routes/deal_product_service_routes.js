const router = require("express").Router();
const {
  createProduct_Service,
  getProduct_ServiceById,
  getProducts_Services,
  deleteProduct_Service,
  updateProduct_Service,
} = require("../controllers/deal_product_service_controller");

// ACTIVITY ENDPOINTS
router.post("/create", createProduct_Service);
router.get("/get-product-service/:id", getProduct_ServiceById);
router.get("/get-products-services", getProducts_Services);
router.put("/update/:id", updateProduct_Service);
router.delete("/delete/:id", deleteProduct_Service);

module.exports = router;
