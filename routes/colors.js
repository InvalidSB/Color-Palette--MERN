const express = require("express");
const router = express.Router();
const ColorModel = require("../models/Colors");
const RequireLogin = require("../middleware/RequireLogin");

router.post("/addcolor", RequireLogin, (req, res) => {
  // console.log(req.user._id)
  const { color_name } = req.body;
  const { _id } = req.user;

  if (!color_name) {
    return res.status(422).json({ error: "You need to add color name" });
  }

  const addedcolor = new ColorModel({
    addedBy: _id,
    color_name,
  });
  addedcolor
    .save()
    .then((color) => {
      res.json({ message: "Color added successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/", RequireLogin, (req, res) => {
  ColorModel.find({}).sort({ createdAt: -1 }).then((color) => {
    res.status(500).json({ color });
  });
});



// my added colors
// /colors/my
router.get("/my", RequireLogin, (req, res) => {
  ColorModel.find({ addedBy: req.user._id })
    .sort("-createdAt")
    .then((mycolors) => {
      res.json({ mycolors });
    })
    .catch((err) => console.log(err));
});







router.delete("/delete/:colorId", RequireLogin, (req, res) => {
  ColorModel.findOne({ _id: req.params.colorId })
  .exec((err, color) => {
    if (err || !color) {
      return res.status(422).json({ error: err });
    }
    if (color.addedBy._id.toString() === req.user._id.toString()) {
      color
      .remove()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
    }
  });
});










module.exports = router;