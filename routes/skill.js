const express = require("express");
const skillRouter = express.Router();
const skillsController = require("../controllers/skillsController");
const protect = require("../middleware/auth");

skillRouter
  .route("/")
  .get(skillsController.getSkills)
  .post(protect, skillsController.createSkills)
  .put(protect, skillsController.updateSkills)
  .delete(protect, skillsController.deleteSkills);
  
skillRouter
  .route("/:id")
  .delete(protect, skillsController.deleteSkills);

module.exports = skillRouter;
