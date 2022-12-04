const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, "Name cannot be more than 50 charactors"],
    },
    price: {
      type: Number,
      required: true,
      maxLength: [5, "product price should not be more than 5 digits"],
    },
    description: {
      type: String,
      // default editor needed to be added here
    },
    photos: [
      {
        secureUrl: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
