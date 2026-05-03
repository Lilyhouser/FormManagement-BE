const FormStatus = require("../constraints/formStatus");
const { serverErrorMessageRes } = require("../helpers/serverErrorMessage");
const Form = require("../models/Form");
const { ROLE } = require("../constraints/role");
const { checkValidFormStatus } = require("../helpers/checkValidStatus");
const Field = require("../models/Field");

const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};

const getAllActiveForms = async (req, res) => {
  try {
    const forms = await Form.find({ status: FormStatus.ACTIVE })
      .sort({ order: 1 })
      .select("-createdAt -updatedAt -__v")
      .lean();
    res.json(forms);
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};
const createNewForm = async (req, res) => {
  try {
    const { title, description, order, status } = req.body;
    if (!status) status = FormStatus.DRAFT;
    if (!checkValidFormStatus(status)) {
      return res.status(400).json({
        message: `Invalid Form Status. Please choose one of options: ${Object.values(FormStatus)}`,
      });
    }
    const newForm = await Form.create({
      title,
      description,
      order,
      status: !status ? FormStatus.DRAFT : status,
    });
    res.status(201).json({
      newForm,
    });
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};
const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id).lean();
    if (!form) {
      return res
        .status(404)
        .json({ message: `Not found any form with id ${id}!` });
    }
    if (form.status === FormStatus.DRAFT && req.role !== ROLE.ADMIN) {
      return res.status(401).json({
        message: "You are not allowed to access this data.",
      });
    }

    const fields = await Field.find({ formId: id }).select(
      "-createdAt -updatedAt -__v -formId",
    );
    res.status(200).json({ ...form, fields });
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};
const updateFormById = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body?.status && !checkValidFormStatus(req.body?.status)) {
      return res.status(400).json({
        message: `Invalid Form Status. Please choose one of options: ${Object.values(FormStatus)}`,
      });
    }
    await Form.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.sendStatus(200);
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};
const deleteFormById = async (req, res) => {
  try {
    const { id } = req.params;
    await Form.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};

module.exports = {
  getAllForms,
  createNewForm,
  getFormById,
  updateFormById,
  deleteFormById,
  getAllActiveForms,
};
