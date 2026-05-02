const FormStatus = require("../constraints/formStatus");

const checkValidFormStatus = (status) => {
  return Object.values(FormStatus).includes(status);
};

module.exports = { checkValidFormStatus };
