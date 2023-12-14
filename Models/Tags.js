const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const tagsSchema = mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
    },
    tagDesc: {
      type: String,
      required: true,
    },
  },
  { collection: "Tags" }
);

module.exports = mongoose.model("Tags", tagsSchema);
