const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const JWT_SECRET = require("../config/keys");
const JWT_SECRET = require("../config/dev");
const RequireLogin = require("../middleware/RequireLogin");

router.get("/private", RequireLogin, (req, res) => {
  res.status(200).json({ msg: `You are user ${req.user.name}` });
});

// signup route
router.post("/register", (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!email || !name || !password) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  UserModel.findOne({ email: email })
    .then((saveduser) => {
      if (saveduser) {
        return res
          .status(422)
          .json({ error: "user already exist with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new UserModel({
          email,
          password: hashedpassword,
          name,
          pic,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  UserModel.findOne({ email: email })

    .then((saveduser) => {
      if (!saveduser) {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
      bcrypt.compare(password, saveduser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: saveduser._id }, JWT_SECRET);
          const { _id, name, email, pic } = saveduser;

          res.json({
            token,
            user: { _id, name, email, pic },
          });
          // res.json({message:"Logged in successfuly"})
        } else {
          return res.status(422).json({ error: "invalid email and password" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/updatedetails/:id", RequireLogin, async(req, res) => {
  console.log("update han")
  const{name,email}=req.body
 
         UserModel.findOne({ _id: req.user._id }, (err, user) => {
           if (err || !user) {
             return res.status(400).json({
               error: "User not found",
             });
           }
           if (!name) {
             return res.status(400).json({
               error: "Name is required",
             });
           } else {
             user.name = name;
           }
          
           if (!email) {
             return res.status(400).json({
               error: "Email is required",
             });
           } else {
             user.email = email;
           }
          
           user.save((err, updatedUser) => {
             if (err) {
               console.log("USER UPDATE ERROR", err);
               return res.status(400).json({
                 error: "User update failed",
               });
             }
            
             res.json(updatedUser);
           });
         })
        }) 

module.exports = router;
