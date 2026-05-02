const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FieldSchema = new Schema(
  {
    formModelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
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
      require,
    },
    options: {
      type: [String],
      require,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Field", FieldSchema);
