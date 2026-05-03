const Form = require("../models/Form");
const Field = require("../models/Field");

const checkFormExist = async (req, res) => {
  const { id } = req.params;
  const form = await Form.findById(id);
  if (!form) {
    return {
      exist: false,
      status: 404,
      message: `Not found any form with id ${id}`,
    };
  }
  return { exist: true, status: 200, form };
};

const checkFieldExist = async (req, res) => {
  const { fid, id } = req.params;
  const form = await checkFormExist(req, res);
  if (form.exist === false) return form;

  const field = await Field.findById(fid);
  if (!field || String(field.formId) !== String(form.form._id)) {
    return {
      exist: false,
      status: 404,
      message: `Not found any field with id ${fid} in form ${id}!`,
    };
  }
  return { exist: true, status: 200, field };
};

module.exports = { checkFormExist, checkFieldExist };
