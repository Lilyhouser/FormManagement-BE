const { serverErrorMessageRes } = require("../helpers/serverErrorMessage");
const Form = require("../models/Form");

const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};
