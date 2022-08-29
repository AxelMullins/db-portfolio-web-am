const mongoose = require("mongoose");
const { Schema } = mongoose;

const portfolioSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: Array,
    required: true,
  },
  gif: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
  },
  tools: {
    type: String,
    required: true,
  },
  url: {
    github: { type: String, default: "https://github.com/AxelMullins" },
    deploy: { type: String, default: "https://github.com/AxelMullins" },
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = { Portfolio };
