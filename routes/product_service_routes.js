const router = require("express").Router();
const {
  createProduct_Service,
  deleteProduct_Service,
  getProduct_ServiceById,
  getProduct_Services,
  updateProduct_Service,
} = require("../controllers/product_service_controller");
const upload = require("../apps/multer");

// ACTIVITY ENDPOINTS
router.post("/create", upload.single("image"), createProduct_Service);
router.put("/update/:id", updateProduct_Service);
router.delete("/delete/:id", deleteProduct_Service);
router.get("/get-product-service/:id", getProduct_ServiceById);
router.get("/get-products-services", getProduct_Services);

module.exports = router;
