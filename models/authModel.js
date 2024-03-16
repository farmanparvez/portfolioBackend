const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password required"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password not match",
    },
  },
});

authSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.confirmPassword = undefined;
  next()
})

authSchema.methods.correctPassword = async (enterPassword, password) => {
  return await bcrypt.compare(enterPassword, password)
}

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth
