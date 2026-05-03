const Field = require("../models/Field");
const { checkFormExist, checkFieldExist } = require("../helpers/formHelper");
const { serverErrorMessageRes } = require("../helpers/serverErrorMessage");

const addFieldToFormById = async (req, res) => {
  try {
    const formResult = await checkFormExist(req, res);
    if (!formResult.exist) {
      return res.status(formResult.status).json({
        message: formResult.message,
      });
    }
    const fieldArr = req.body.map((field) => ({
      ...field,
      formId: formResult.form._id,
    }));
    await Field.insertMany(fieldArr);
    res.status(201).json({ message: "Add field successfully" });
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};
const updateFieldById = async (req, res) => {
  try {
    const fieldResult = await checkFieldExist(req, res);
    if (!fieldResult.exist) {
      return res.status(fieldResult.status).json({
        message: fieldResult.message,
      });
    }
    await Field.findByIdAndUpdate(fieldResult.field._id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Update field successfully" });
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};
const deleteFieldById = async (req, res) => {
  try {
    const fieldResult = await checkFieldExist(req, res);
    if (!fieldResult.exist) {
      return res.status(fieldResult.status).json({
        message: fieldResult.message,
      });
    }
    await Field.findByIdAndDelete(fieldResult.field._id);
    res.status(200).json({ message: "Delete field successfully" });
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};

module.exports = {
  addFieldToFormById,
  deleteFieldById,
  updateFieldById,
};
