const { default: mongoose } = require("mongoose");

const checkRequiredFields = (...fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      const childField = field.split(".");
      if (
        childField.length === 2 &&
        req.body[childField[0]][childField[1]] === undefined
      ) {
        return res.status(400).json({
          message: `${field} is required!`,
        });
      }
      if (childField.length === 1 && req.body[field] === undefined) {
        return res.status(400).json({
          message: `${field} is required!`,
        });
      }
    }
    next();
  };
};

const checkValidObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Id is invalid",
    });
  }
  next();
};

module.exports = { checkRequiredFields, checkValidObjectId };
