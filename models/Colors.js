const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    color_name: {
      type: String,
      required: true,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserModel",
    
      },
  },
  {
    timestamps: true,
  }
);

const ColorModel = mongoose.model("ColorModel", colorSchema);
module.exports = ColorModel;
