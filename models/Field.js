const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FieldSchema = new Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },
    name: {
      type: String,
      require,
    },
    type: {
      type: String,
      require,
    },
    placeholder: {
      type: String,
    },
    order: {
      type: String,
      require,
    },
    label: {
      type: String,
      require,
    },
    require: {
      type: Boolean,
      default: false,
    },
    options: {
      type: [String],
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Field", FieldSchema);
