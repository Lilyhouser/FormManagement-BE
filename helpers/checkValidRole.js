const { ROLE } = require("../constraints/role");

const checkValidRole = (role) => {
  return Object.values(ROLE).includes(role);
};

module.exports = { checkValidRole };
