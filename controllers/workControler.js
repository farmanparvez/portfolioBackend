const catchAsync = require("../utils/catchAsync");
const Work = require("../models/Work");

exports.getWorks = catchAsync(async (req, res, next) => {
  const work = await Work.find();

  res.status(200).json({
    status: "Success",
    message: "successfully",
    work,
  });
});

exports.createWorks = catchAsync(async (req, res, next) => {
  const { name, repoLink, websiteLink, details } = req.body;
  await Work.create({
    name,
    repoLink,
    websiteLink,
    details,
  });

  res.status(200).json({
    status: "success",
    message: "Work is created successfully",
  });
});

exports.updateWorks = catchAsync(async (req, res, next) => {
  const { name, repoLink, websiteLink, details, id } = req.body;
  const data = { name , repoLink, websiteLink, details}
  const work = await Work.findByIdAndUpdate( id , data, {
    new: true,
    runValidators: true,
  });

  if (!work) return next(new AppError("No tour found with that ID", 404));

  res.status(200).json({
    status: "success",
    message: "Work is Updated successfully",
  });
});

exports.deleteWorks = catchAsync(async (req, res, next) => {
  const work = await Work.findByIdAndDelete(req.params.id)

  if (!work) return next(new AppError("No work found to delete ID", 404));

  res.status(200).json({
    status: "success",
    message: "Work is delete successfully",
  });
});
