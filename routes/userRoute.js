import express from "express";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const register = new User({
    name: req.boby.name,
    email: req.body.email,
    address: req.body.address,
    contact: req.body.contact,
    image: req.body.image,
    password: req.body.password,
  });
  try {
    const saveRegister = await register.save({});
    res
      .status(200)
      .json({ message: "user register successfully", data: saveRegister });
  } catch (error) {
    res.status(400).json({ Error: error, message: "user can not register " });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ email });

    if (!userData) {
      res.status(404).json({
        message: "User not Found",
        data: {},
      });
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);
    const secret = process.env.SECRET;
    if (passwordMatch) {
      const token = jwt.sign(
        {
          userId: userData._id,
          isAdmin: userData.isAdmin,
        },
        secret
      );
      console.log(userData._id);
      res.status(202).json({
        user: userData.email,
        token: token,
      });
    } else {
      return res.status(406).json({ message: "Password is wrong" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ Error: error, message: "error occured while login" });
  }
});

export default router;
