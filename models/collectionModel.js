const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "Name is required field"],
      maxLength: [50, "Name should not be more than 50 charactors"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("collection", collectionSchema);
