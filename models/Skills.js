const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: [true, "Icon is required"],
    unique: true
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true
  },
  description: {
    type: String,
  },
});

module.exports = Skills = mongoose.model('Skills', skillsSchema)
