const express = require("express");
const heroRouter = express.Router();
const heroController = require("../controllers/heroController");
const protect = require("../middleware/auth");

heroRouter
  .route("/")
  .get(heroController.getHero)
  .post(protect, heroController.createHero)
  .put(protect, heroController.updateHero);
heroRouter.route("/:id").delete(protect, heroController.deleteHero);

module.exports = heroRouter;
