import { request } from "express";
import User from "../mongodb/models/users.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// import cloudinary from "../utils/cloudinary.js";
// import Users from "../mongodb/models/users";
const getAllUsers = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      // console.log(user);

      res.json(user);
    });
  } else {
    res.json(null);
  }
};
//Register Endpoint
const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      username,
      loggedIn,
      profileImage,
    } = req.body;
    // console.log("\n\n\n\n\n\n\n\n", cloudinary);
    console.log(profileImage);
    const cloudinaryResult = await cloudinary.uploader.upload(
      profileImage.myFile
    );
    if (!profileImage.myFile) {
      return res.json({
        error: "image is required",
      });
    }

    if (!firstName || !lastName) {
      return res.json({
        error: "name is required",
      });
    }
    if (!password || password.length < 8) {
      return res.json({
        error: "password is required, or more than 8 characters",
      });
    }

    //check email

    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ error: "email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const myUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      loggedIn: true,
      profileImage: {
        public_id: cloudinaryResult.public_id,
        url: cloudinaryResult.secure_url,
      },
    });
    res.status(200).json(myUser);
  } catch (err) {
    console.log(err);
  }
};

//Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if user exists
    if (!email) {
      return res.json({
        error: "email is required",
      });
    }
    if (!password) {
      return res.json({
        error: "password is required",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.json({
        error: "password is incorrect",
      });
    } else if (match) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          loggedIn: true,
          username: user.username,
          profileImage: user.profileImage,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
const getUserInfoByID = async (req, res) => {};

export { getAllUsers, createUser, getUserInfoByID, loginUser };
