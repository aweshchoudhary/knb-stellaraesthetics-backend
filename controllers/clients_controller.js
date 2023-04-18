const asyncHandler = require("express-async-handler");
const Client_Model = require("../models/Client_Model");

const createClient = asyncHandler(async (req, res) => {
  const newClient = new Client_Model({ ...req.body });
  const client = await newClient.save();
  res.status(200).json({ message: "client has been created", data: client });
});

const getClients = asyncHandler(async (req, res) => {
  const { size, start, sorting, search } = req.query;

  let convertedSort = {};
  let clientsData;

  const total = await Client_Model.count({});
  if (sorting) {
    const sortArr = JSON.parse(sorting);
    sortArr.forEach((item) => {
      convertedSort = {
        [item.id]: item.desc ? "desc" : "asc",
      };
    });
  }
  if (search) {
    clientsData = await Client_Model.find({
      $text: { $search: search },
    })
      .limit(size)
      .sort(convertedSort);
  } else {
    clientsData = await Client_Model.find({})
      .skip(start)
      .limit(size)
      .sort(convertedSort);
  }
  res.status(200).json({
    data: clientsData,
    meta: { total },
  });
});
const getClientById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const client = await Client_Model.findById(id);
  res.status(200).json({ message: "client has been created", data: client });
});
const updateClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Client_Model.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "client has been updated" });
});
const deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Client_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "client has been deleted" });
});

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
