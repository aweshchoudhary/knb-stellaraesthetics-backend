const asyncHandler = require("express-async-handler");
const Product_Service_Model = require("../models/Product_Service_Model");
const fs = require("fs");
const path = require("path");

const createProduct_Service = asyncHandler(async (req, res) => {
  if (req.file) {
    const { filename, path, size } = req.file;
    const newProduct_Service = new Product_Service_Model({
      ...req.body,
      image: {
        name: filename,
        path: path.split("public")[1],
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
  if (req.body.image && req.file) {
  }
  await Product_Service_Model.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "Product_Service has been updated" });
});
const deleteProduct_Service = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product_service = await Product_Service_Model.findById(id);
  if (!product_service)
    res.status(404).json({ message: "Item has not been found" });

  if (product_service?.image?.name) {
    const path = "public/uploads/" + product_service.image.name;
    const isFileExists = fs.existsSync(path);
    isFileExists &&
      fs.unlink(path, async () => {
        await product_service.deleteOne();
      });
    return res
      .status(200)
      .json({ message: "Product_Service has been deleted" });
  }

  await product_service.deleteOne();
  res.status(200).json({ message: "Product_Service has been deleted" });
});

module.exports = {
  createProduct_Service,
  getProduct_Services,
  getProduct_ServiceById,
  updateProduct_Service,
  deleteProduct_Service,
};
