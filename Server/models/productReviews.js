const mongoose = require("mongoose");

const productReviewsSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    requierd: True,
  },
  customerRating: {
    type: Number,
    required: true,
    default: 1,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

productReviewsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productReviewsSchema.set("toJSON", {
  virtuals: true,
});

exports.ProductReview = mongoose.model("ProductReview", productReviewsSchema);
