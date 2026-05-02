const mongoose = require("mongoose");
const FormStatus = require("../constraints/formStatus");
const Schema = mongoose.Schema;

const FormSchema = new Schema(
  {
    title: {
      type: String,
      require,
    },
    description: {
      type: String,
      require,
    },
    order: {
      type: Number,
      require,
    },
    status: {
      type: String,
      default: FormStatus.DRAFT,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Form", FormSchema);
