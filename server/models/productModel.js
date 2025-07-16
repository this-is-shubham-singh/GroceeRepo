import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Vegetables",
        "Fruits",
        "Drinks",
        "Instant",
        "Dairy",
        "Bakery",
        "Grains",
      ],
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
