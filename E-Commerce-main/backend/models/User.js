const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img:{type:String,default:"https://github.com/mintesGeb/E-Commerce/blob/main/react-mini/src/images/blank-profile-picture.png?raw=true"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
