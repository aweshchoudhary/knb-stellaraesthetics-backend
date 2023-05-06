const asyncHandler = require("express-async-handler");
const Product_Service_Model = require("../models/Product_Service_Model");

const createProduct_Service = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (req.body?.image && req.file) {
    const { filename, path, size } = req.file;
    const newProduct_Service = new Product_Service_Model({
      ...req.body,
      image: {
        name: filename,
        path,
        size,
      },
    });
    const product_service = await newProduct_Service.save();
    return res.status(200).json({
      message: "Product_Service has been created",
      data: product_service,
    });
  } else {
    const newProduct_Service = new Product_Service_Model({ ...req.body });
    const product_service = await newProduct_Service.save();
    res.status(200).json({
      message: "Product_Service has been created",
      data: product_service,
    });
  }
});
const getProduct_Services = asyncHandler(async (req, res) => {
  const product_services = await Product_Service_Model.find({});
  res.status(200).json({
    message: "Product_Service has been created",
    data: product_services,
  });
});
const getProduct_ServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product_service = await Product_Service_Model.findById(id);
  res.status(200).json({
    message: "Product_Service has been created",
    data: product_service,
  });
});
const updateProduct_Service = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Product_Service_Model.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "Product_Service has been updated" });
});
const deleteProduct_Service = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Product_Service_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "Product_Service has been deleted" });
});

module.exports = {
  createProduct_Service,
  getProduct_Services,
  getProduct_ServiceById,
  updateProduct_Service,
  deleteProduct_Service,
};
