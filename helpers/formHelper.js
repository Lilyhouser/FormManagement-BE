const Form = require("../models/Form");
const Field = require("../models/Field");

const checkRequireField = (input, field) => {
  if (field.require && !input) {
    return {
      valid: false,
      message: `You must fill in the field ${field.label}`,
    };
  }
  return { valid: true, message: "Valid field" };
};

const checkValidNumberInput = (input, field) => {
  if (!Number.isInteger(input)) {
    return {
      valid: false,
      message: `You must fill in the field ${field.label} with a valid number`,
    };
  }
  if ((field?.min && input < field.min) || (field?.max && input > field.max)) {
    return {
      valid: false,
      message: `You must fill in the field ${field.label} with a number ${field?.min ? `at least ${field.min}` : ""} ${field?.max ? `at most ${field.max}` : ""}`,
    };
  }
  return { valid: true, message: "Valid number input" };
};

const checkValidStringInput = (input, field) => {
  if (
    (field?.min && input.length < field.min) ||
    (field?.max && input.length > field.max)
  ) {
    return {
      valid: false,
      message: `You must fill in the field ${field.label} with a number ${field?.min ? `at least ${field.min}` : ""} ${field?.max ? `at most ${field.max}` : ""}`,
    };
  }
  return { valid: true, message: "Valid string input" };
};

const checkValidInputSelect = (input, field) => {
  if (input && !field.options.includes(input)) {
    return {
      valid: false,
      message: `You must fill in the field ${field.label} with a valid option`,
    };
  }
  return { valid: true, message: "Valid input select" };
};

const checkValidColorInput = (input, field) => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(input)) {
    return {
      valid: false,
      message: `You must fill in the field ${field.label} with a valid color code (#RRGGBB)`,
    };
  }
  return { valid: true, message: "Valid color input" };
};

const checkValidDateInput = (input, field) => {
  if (!(new Date(input) instanceof Date)) {
    return {
      valid: false,
      message: `You must fill in the field ${field.label} with a valid date`,
    };
  }

  if (new Date(input).getTime() < new Date().getTime()) {
    return {
      valid: false,
      message: `You must fill in the field ${field.label} with a date after the current date`,
    };
  }
  return { valid: true, message: "Valid date input" };
};

const checkValidSubmitForm = (formData, fields) => {
  const mappedData = {};
  for (let field of fields) {
    const requireCheck = checkRequireField(formData[field.name], field);
    if (!requireCheck.valid) return requireCheck;
    switch (field.type) {
      case "text":
        const textCheck = checkValidStringInput(formData[field.name], field);
        if (!textCheck.valid) return textCheck;
        mappedData[field.name] = formData[field.name];
        break;
      case "textarea":
        const textAreaCheck = checkValidStringInput(
          formData[field.name],
          field,
        );
        if (!textAreaCheck.valid) return textAreaCheck;
        mappedData[field.name] = formData[field.name];
        break;
      case "number":
        const numberCheck = checkValidNumberInput(formData[field.name], field);
        if (!numberCheck.valid) return numberCheck;
        mappedData[field.name] = formData[field.name];
        break;
      case "select":
        const selectCheck = checkValidInputSelect(formData[field.name], field);
        if (!selectCheck.valid) return selectCheck;
        mappedData[field.name] = formData[field.name];
        break;
      case "color":
        const colorCheck = checkValidColorInput(formData[field.name], field);
        if (!colorCheck.valid) return colorCheck;
        mappedData[field.name] = formData[field.name];
        break;
      case "date":
        const dateCheck = checkValidDateInput(formData[field.name], field);
        if (!dateCheck.valid) return dateCheck;
        mappedData[field.name] = new Date(formData[field.name]);
        break;
      default:
        mappedData[field.name] = formData[field.name];
        break;
    }
  }
  return { valid: true, message: "Valid form submission", data: mappedData };
};

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

module.exports = { checkFormExist, checkFieldExist, checkValidSubmitForm };
