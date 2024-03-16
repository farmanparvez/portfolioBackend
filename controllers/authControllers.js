const Auth = require("../models/authModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

exports.signUp = catchAsync(async (req, res, next) => {
  let { name, email, password, confirmPassword } = req.body;
  const auth = await Auth.findOne({ email });
  if (auth) return next(new AppError("User already exits", 400));
  await Auth.create({
    name,
    email,
    password,
    confirmPassword,
  });

  res.status(200).json({
    status: "Success",
    message: "User created successfully",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if(!email || !password) return next(new AppError('Email and passowrd required', 400))
  const user = await Auth.findOne({ email });
  if (!user) return next(new AppError("Invalid credentials"));

  const isMatch = await user.correctPassword(password, user.password)

  if(!isMatch) return next(new AppError('Invalid password'))

  const token = jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECERET,
   { expiresIn: process.env.JWT_EXPIRES}
  );
  
  res.status(200).json({
    status: 'Success',
    message: 'Login successfully',
    token
  })
});
