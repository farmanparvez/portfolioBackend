const catchAsync = require("../utils/catchAsync");
const Education = require("../models/educationModel");
const AppError = require("../utils/appError");

exports.getEducation  = catchAsync(async (req, res, next) => {
    const education = await Education.find();
  
    res.status(200).json({
      status: "Success",
      message: "successfully",
      education,
    });
  });

exports.createEducation = catchAsync(async (req, res, next) => {
  const { degree, institution, to, from } = req.body;
  const education = await Education.findOne({ degree });

  if (education) return next(new AppError("Degree already exits", 400));

  await Education.create({
    degree,
    institution,
    from,
    to,
  });

  res.status(200).json({
    status: "success",
    message: "Education created successfully",
    education,
  });
});

exports.updateEducation  = catchAsync(async (req, res, next) => {
    const { degree, institution, to, from, id } = req.body;
    const data = { degree, institution, to, from  };
    const education = await Education.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  
    if (!education) return next(new AppError("No education found with that ID", 404));
  
    res.status(200).json({
      status: "success",
      message: "Education is Updated successfully",
    });
  });
  
  exports.deleteEducation  = catchAsync(async (req, res, next) => {
    const education = await Education.findByIdAndDelete(req.params.id);
  
    if (!education) return next(new AppError("No education found to delete ID", 404));
  
    res.status(200).json({
      status: "success",
      message: "education is delete successfully",
    });
  });
