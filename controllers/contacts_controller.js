const asyncHandler = require("express-async-handler");
const Contact_Model = require("../models/Contact_Model");

const createContact = asyncHandler(async (req, res) => {
  const newContact = new Contact_Model({ ...req.body });
  const client = await newContact.save();
  res.status(200).json({ message: "client has been created", data: client });
});
const getContacts = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start } = req.query;

  let contacts;
  let total;

  if (data) {
    contacts = await Contact_Model.find(filters || {})
      .limit(limit || 25)
      .select(select)
      .sort(sort)
      .skip(start || 0);
  }
  if (count) {
    contacts = await Contact_Model.count(filters || search || {})
      .limit(limit || 25)
      .select(select)
      .sort(sort)
      .skip(start || 0);
    total = contacts;
  }
  if (search) {
    contacts = await Contact_Model.find({ $text: { $search: search } })
      .limit(limit || 25)
      .select(select)
      .sort(sort)
      .skip(start || 0);
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
