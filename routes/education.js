const express = require("express");
const educationRouter = express.Router();
const protect = require("../middleware/auth");
const educationControllers = require("../controllers/EducationController")

educationRouter
  .route("/")
  .get(educationControllers.getEducation)
  .post(protect, educationControllers.createEducation)
  .put(protect, educationControllers.updateEducation)
educationRouter.route('/:id').delete(protect, educationControllers.deleteEducation)

module.exports = educationRouter;
