const express = require("express");
const aboutRouter = express.Router();
const protect = require("../middleware/auth");
const aboutControllers = require("../controllers/aboutControllers");

aboutRouter
  .route("/")
  .get(aboutControllers.getAbout)
  .post(protect, aboutControllers.createAbout)
  .put(protect, aboutControllers.updateAbout);
aboutRouter.route("/:id").delete(protect, aboutControllers.deleteAbout);

module.exports = aboutRouter;
