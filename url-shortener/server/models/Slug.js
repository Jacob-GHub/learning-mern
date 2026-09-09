const mongoose = require("mongoose");

const slugSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const URL = mongoose.model("URL", slugSchema);
module.exports = URL;
