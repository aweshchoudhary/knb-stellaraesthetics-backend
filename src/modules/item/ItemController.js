const asyncHandler = require("express-async-handler");
const ItemModel = require("./ItemModel");
const fs = require("fs");

const createProduct_Service = asyncHandler(async (req, res) => {
  if (req.file) {
    const { filename, path, size } = req.file;
    const newProduct_Service = new ItemModel({
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
    const newProduct_Service = new ItemModel({ ...req.body });
    const product_service = await newProduct_Service.save();
    res.status(200).json({
      message: "Product_Service has been created",
      data: product_service,
    });
  }
});
const getProduct_Services = asyncHandler(async (req, res) => {
  const product_services = await ItemModel.find({});
  res.status(200).json({
    message: "Product_Service has been created",
    data: product_services,
  });
});
const getProduct_ServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { select, populate } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing product_service ID" });
  }

  const product_service = await ItemModel.findById(id)
    .populate(populate)
    .select(select);

  if (!product_service) {
    return res
      .status(404)
      .json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, data: product_service });
});
const updateProduct_Service = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (req.body.image && req.file) {
  }
  await ItemModel.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "Product_Service has been updated" });
});
const deleteProduct_Service = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product_service = await ItemModel.findById(id);
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
