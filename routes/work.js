const express = require("express");
const workRouter = express.Router();
const protect = require("../middleware/auth");
const workController = require("../controllers/workControler");

workRouter
  .route("/")
  .get(workController.getWorks)
  .post(protect, workController.createWorks)
  .put(protect, workController.updateWorks)
  .delete(protect, workController.deleteWorks);
workRouter.route("/:id").delete(protect, workController.deleteWorks);

module.exports = workRouter;
