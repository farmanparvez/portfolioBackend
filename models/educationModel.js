const mongoose = require("mongoose");

const educationSehema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, "Degree name is required"],
    unique: true,
  },
  institution: {
    type: String,
    required: [true, "Institution name is required"],
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },

});

module.exports = Education = mongoose.model("Education", educationSehema);
