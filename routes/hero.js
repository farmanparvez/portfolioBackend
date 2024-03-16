const express = require("express");
const heroRouter = express.Router();
const heroController = require("../controllers/heroController");
const protect = require("../middleware/auth");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Files will be uploaded to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user._id}-${Date.now()}.${ext}`)
  }
});

const upload = multer({ storage });

heroRouter
  .route("/")
  .get(heroController.getHero)
  .post(protect, heroController.createHero)
  .put(protect, heroController.updateHero);

heroRouter
  .route('/resume').get(heroController.getResume)
  .post(protect, upload.single('file'), heroController.uploadResume);


heroRouter.route("/:id").delete(protect, heroController.deleteHero);

module.exports = heroRouter;
