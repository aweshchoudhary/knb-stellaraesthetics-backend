const DealItemModel = require("./DealItemModel");
const DealModel = require("../deal/DealModel");
const asyncHandler = require("express-async-handler");

const createDealItem = asyncHandler(async (req, res) => {
  const newProduct_Service = new DealItemModel({ ...req.body });
  const product_service = await newProduct_Service.save();
  await DealModel.findByIdAndUpdate(req.body.dealId, {
    $push: { items: product_service.id },
  });

  res.status(200).json({
    message: "Product_Service has been created",
    data: product_service,
  });
});

const getDealItems = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data } =
    req.query;

  const filtersObj = filters
    ? JSON.parse(filters).reduce(
        (obj, item) => ({ ...obj, [item.id]: item.value }),
        {}
      )
    : {};
  const sortObj = sort
    ? JSON.parse(sort).reduce(
        (obj, item) => ({ ...obj, [item.id]: item.desc ? "desc" : "asc" }),
        {}
      )
    : {};

  const buildQuery = (model, filtersObj, limit, select, sortObj, start) => {
    return model
      .find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  };

  let products_services;
  let total = 0;

  const queries = [];

  if (data) {
    queries.push(
      buildQuery(DealItemModel, filtersObj, limit, select, sortObj, start)
    );
  }

  if (count) {
    queries.push(
      DealItemModel.countDocuments(filtersObj)
        .limit(limit || 25)
        .select(select)
        .sort(sortObj)
        .skip(start || 0)
        .then((count) => {
          total = count;
        })
    );
  }

  if (search) {
    queries.push(
      buildQuery(
        DealItemModel,
        { $text: { $search: search } },
        limit,
        select,
        sortObj,
        start
      )
    );
  }

  await Promise.all(queries)
    .then((results) => {
      if (data) {
        [products_services] = results;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json({
    data: products_services,
    meta: { total },
  });
});

const getDealItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { select, populate } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: "Missing item ID" });
  }

  const item = await DealItemModel.findById(id)
    .populate(populate)
    .select(select);

  if (!item) {
    return res
      .status(404)
      .json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, data: item });
});

const updateDealItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (req.body.image && req.file) {
  }
  await Product_Service_Model.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "Product_Service has been updated" });
});

const deleteDealItem = asyncHandler(async (req, res) => {
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
  createDealItem,
  getDealItems,
  getDealItemById,
  deleteDealItem,
  updateDealItem,
};
