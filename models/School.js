const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema({
  school: {
    type: String,
  },
  CHALLENGER: {
    type: Number,
  },
  GRANDMASTER: {
    type: Number,
  },
  MASTER: {
    type: Number,
  },
  DIAMOND: {
    type: Number,
  },
  PLATINUM: {
    type: Number,
  },
  GOLD: {
    type: Number,
  },
  SILVER: {
    type: Number,
  },
  BRONZE: {
    type: Number,
  },
  IRON: {
    type: Number,
  },
  students: {
    type: Number,
  },
  totalScore: {
    type: Number,
  },
});

module.exports = mongoose.model("School", schoolSchema);
