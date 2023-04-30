const asyncHandler = require("express-async-handler");
const Contact_Model = require("../models/Contact_Model");

const createContact = asyncHandler(async (req, res) => {
  const newContact = new Contact_Model({ ...req.body });
  const client = await newContact.save();
  res.status(200).json({ message: "client has been created", data: client });
});
const getContacts = asyncHandler(async (req, res) => {
  const { size, start, sorting, search } = req.query;

  let convertedSort = {};
  let clientsData;

  let total;
  if (sorting) {
    const sortArr = JSON.parse(sorting);
    sortArr.forEach((item) => {
      convertedSort = {
        [item.id]: item.desc ? "desc" : "asc",
      };
    });
  }
  if (search) {
    total = await Contact_Model.count({
      $text: { $search: search },
    });
    clientsData = await Contact_Model.find({
      $text: { $search: search },
    })
      .limit(size || 25)
      .sort(convertedSort);
  } else {
    clientsData = await Contact_Model.find({})
      .skip(start)
      .limit(size || 25)
      .sort(convertedSort);
    total = await Contact_Model.count({});
  }
  res.status(200).json({
    data: clientsData,
    meta: { total },
  });
});
const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const client = await Contact_Model.findById(id);
  res.status(200).json({ message: "client has been created", data: client });
});
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Contact_Model.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "client has been updated" });
});
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Contact_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "client has been deleted" });
});

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
