const catchAsync = require("../utils/catchAsync");
const Hero = require("../models/Hero");
const AppError = require("../utils/appError");

exports.createHero = catchAsync(async (req, res, next) => {
  const { name, profileTitle, profileType, detail, extra } = req.body;
  const isExist = await Hero.findOne()
  if(isExist) return next(new AppError('Profile already exist'))
  await Hero.create({
    name,
    profileTitle,
    profileType,
    detail,
    extra,
  });

  res.status(200).json({
    status: 'success',
    message: 'Profile detail created successfully'
  })
});

exports.updateHero = catchAsync(async (req, res, next) => {
  const { name, profileTitle, profileType, detail, extra, id } = req.body;
  const data = {name, profileTitle, profileType, detail, extra}
  const hero = await Hero.findByIdAndUpdate( id , data, {
    new: true,
    runValidators: true,
  });

  if (!hero) return next(new AppError("No hero found with that ID", 404));

  res.status(200).json({
    status: "success",
    message: "Hero is Updated successfully",
  });
});

exports.deleteHero = catchAsync(async (req, res, next) => {
  const hero = await Hero.findByIdAndDelete(req.params.id)

  if (!hero) return next(new AppError("No hero found to delete ID", 404));

  res.status(200).json({
    status: "success",
    message: "Hero is delete successfully",
  });
});



exports.getHero = catchAsync(async (req, res, next) => {
  const details = await Hero.findOne()

  res.status(200).json({
    status: 'success',
    message: 'Profile fetch successfully',
    details
  })
});
