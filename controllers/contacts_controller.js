const asyncHandler = require("express-async-handler");
const Contact_Model = require("../models/Contact_Model");

const createContact = asyncHandler(async (req, res) => {
  const newContact = new Contact_Model({ ...req.body });
  const contact = await newContact.save();
  res.status(200).json({ message: "contact has been created", data: contact });
});
const getContacts = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data } =
    req.query;

  let contacts;
  let total = 0;
  let sortObj;
  let filtersObj = {};

  if (filters) {
    const filtersArr = JSON.parse(filters);
    filtersArr.forEach((item) => {
      filtersObj = {
        ...filtersObj,
        [item.id]: item.value,
      };
    });
  }
  if (sort) {
    const sortArr = JSON.parse(sort);
    sortArr.forEach((item) => {
      sortObj = {
        ...sortObj,
        [item.id]: item.desc ? "desc" : "asc",
      };
    });
  }
  if (data) {
    contacts = await Contact_Model.find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (count) {
    total = await Contact_Model.count(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  if (search) {
    contacts = await Contact_Model.find({ $text: { $search: search } })
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0);
  }
  res.status(200).json({
    data: contacts,
    meta: { total },
  });
});
const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact_Model.findById(id);
  res.status(200).json({ data: contact });
});
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Contact_Model.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "contact has been updated" });
});
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Contact_Model.findByIdAndDelete(id);
  res.status(200).json({ message: "contact has been deleted" });
});

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
