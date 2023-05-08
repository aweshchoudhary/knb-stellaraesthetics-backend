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
      buildQuery(Contact_Model, filtersObj, limit, select, sortObj, start)
    );
  }

  if (count) {
    queries.push(
      Contact_Model.countDocuments(filtersObj)
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
        Contact_Model,
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

// const getContacts = asyncHandler(async (req, res) => {
//   const { filters, search, sort, limit, select, count, start, data } =
//     req.query;

//   let contacts;
//   let total = 0;
//   let sortObj;
//   let filtersObj = {};

//   if (filters) {
//     const filtersArr = JSON.parse(filters);
//     filtersArr.forEach((item) => {
//       filtersObj = {
//         ...filtersObj,
//         [item.id]: item.value,
//       };
//     });
//   }
//   if (sort) {
//     const sortArr = JSON.parse(sort);
//     sortArr.forEach((item) => {
//       sortObj = {
//         ...sortObj,
//         [item.id]: item.desc ? "desc" : "asc",
//       };
//     });
//   }
//   if (data) {
//     contacts = await Contact_Model.find(filtersObj)
//       .limit(limit || 25)
//       .select(select)
//       .sort(sortObj)
//       .skip(start || 0);
//   }
//   if (count) {
//     total = await Contact_Model.count(filtersObj)
//       .limit(limit || 25)
//       .select(select)
//       .sort(sortObj)
//       .skip(start || 0);
//   }
//   if (search) {
//     contacts = await Contact_Model.find({ $text: { $search: search } })
//       .limit(limit || 25)
//       .select(select)
//       .sort(sortObj)
//       .skip(start || 0);
//   }
//   res.status(200).json({
//     data: contacts,
//     meta: { total },
//   });
// });

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
