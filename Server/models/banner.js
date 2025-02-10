const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

bannerSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bannerSchema.set("toJSON", {
  virtuals: true,
});

exports.Banner = mongoose.model("Banner", bannerSchema);
exports.bannerSchema = bannerSchema;
