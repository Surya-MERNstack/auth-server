const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const verifySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { collection: "VerifyUser" }
);

module.exports = mongoose.model("VerifyUser", verifySchema);
