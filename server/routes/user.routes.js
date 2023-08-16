import express from "express";
import cors from "cors";

import {
  getAllUsers,
  createUser,
  getUserInfoByID,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();
router.use(cors({ credentials: true, origin: "http://localhost:5173" }));
router.route("/login").post(loginUser);
router.route("/profile").get(getAllUsers);
router.route("/register").post(createUser);
// router.route ("/:id").get(getUserInfoByID);

export default router;
