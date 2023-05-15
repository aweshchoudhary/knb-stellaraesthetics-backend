const asyncHandler = require("express-async-handler");
const { ContactModel } = require("../models");

const createContact = asyncHandler(async (req, res) => {
  const newContact = new ContactModel({ ...req.body });
  const contact = await newContact.save();
  res.status(200).json({ message: "contact has been created", data: contact });
});

const getContacts = asyncHandler(async (req, res) => {
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

  let contacts;
  let total = 0;

  const queries = [];

  if (data) {
    queries.push(
      buildQuery(ContactModel, filtersObj, limit, select, sortObj, start)
    );
  }

  if (count) {
    queries.push(
      ContactModel.countDocuments(filtersObj)
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
        ContactModel,
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
        [contacts] = results;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json({
    data: contacts,
    meta: { total },
  });
});

const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { select, populate } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing contact ID" });
  }

  const contact = await ContactModel.findById(id)
    .populate(populate)
    .select(select);

  if (!contact) {
    return res
      .status(404)
      .json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, data: contact });
});

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await ContactModel.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.status(200).json({ message: "contact has been updated" });
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await ContactModel.findByIdAndDelete(id);
  res.status(200).json({ message: "contact has been deleted" });
});

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
