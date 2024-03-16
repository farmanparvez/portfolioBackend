const catchAsync = require("../utils/catchAsync");
const About = require("../models/About");
const AppError = require("../utils/appError");

exports.getAbout = catchAsync(async (req, res, next) => {
    const about = await About.find();
  
    res.status(200).json({
      status: "Success",
      message: "successfully",
      about,
    });
  });

exports.createAbout = catchAsync(async (req, res, next) => {
  const { name, email, phoneNumber, description, links } = req.body;
  // const about = await About.findOne({ degree });

  // if (about) return next(new AppError("Degree already exits", 400));

  await About.create({
    name, email, phoneNumber, description, links
  });

  res.status(200).json({
    status: "success",
    message: "About created successfully",
    // about,
  });
});

exports.updateAbout  = catchAsync(async (req, res, next) => {
    const { name, email, phoneNumber, description, links, id } = req.body;
    const data = { name, email, phoneNumber, description, links  };
    const about = await About.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  
    if (!about) return next(new AppError("No About found with that ID", 404));
  
    res.status(200).json({
      status: "success",
      message: "About is Updated successfully",
    });
  });
  
  exports.deleteAbout  = catchAsync(async (req, res, next) => {
    const about = await About.findByIdAndDelete(req.params.id);
  
    if (!about) return next(new AppError("No About found to delete ID", 404));
  
    res.status(200).json({
      status: "success",
      message: "About is delete successfully",
    });
  });
