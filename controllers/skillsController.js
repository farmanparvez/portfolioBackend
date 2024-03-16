const catchAsync = require("../utils/catchAsync");
const Skills = require("../models/Skills");

exports.getSkills = catchAsync(async (req, res, next) => {
  const skills = await Skills.find();

  res.status(200).json({
    status: "Success",
    message: "successfully",
    skills,
  });
});

exports.createSkills = catchAsync(async (req, res, next) => {
  const { icon, title, description } = req.body;
  await Skills.create({
    icon,
    title,
    description,
  });

  res.status(200).json({
    status: "Success",
    message: "Skill create successfully",
  });
});

exports.updateSkills = catchAsync(async (req, res, next) => {
  const { icon, title, description, id } = req.body;
  const data = { icon, title, description };
  const work = await Skills.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!work) return next(new AppError("No skills found with that ID", 404));

  res.status(200).json({
    status: "success",
    message: "Work is Updated successfully",
  });
});

exports.deleteSkills = catchAsync(async (req, res, next) => {
  const work = await Skills.findByIdAndDelete(req.params.id);

  if (!work) return next(new AppError("No work found to delete ID", 404));

  res.status(200).json({
    status: "success",
    message: "Work is delete successfully",
  });
});
