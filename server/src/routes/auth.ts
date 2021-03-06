/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import * as argon2 from "argon2";
import User, { IUser } from "../models/User";
import { hashPassword } from "../helpers";
import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import { TypedRequestBody } from "../@types/types";
import { MongoError } from "mongodb";
const router = express.Router();

router.post(
  "/register",
  async (req: TypedRequestBody<Omit<IUser, "isAdmin">>, res) => {
    const passwordHashed = await hashPassword(req.body.password);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: passwordHashed,
    });

    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err: unknown) {
      if (err instanceof MongoError) {
        if (err.name === "MongoServerError" && err.code === 11000) {
          res.status(400).json({
            message: "User already exists",
          });
        }
      } else {
        res.status(500).json({ message: err });
      }
    }
  }
);

router.post(
  "/login",
  async (req: TypedRequestBody<Pick<IUser, "username" | "password">>, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });

      // If user is not found
      if (!user) {
        return res.status(401).json({ message: "Wrong credentials" });
      }
      const value = await argon2.verify(user.password, password);
      // If password is incorrect
      if (value === false) {
        return res.status(401).json({ message: "Wrong credentials" });
      }
      // TODO review what you are passing here
      // TODO put this sign token function in helpers methods
      const accessToken = sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        JWT_SECRET_KEY as string,
        { expiresIn: "1h" }
      );
      // TODO enviar el token como header!

      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        accessToken,
      });
    } catch (err: unknown) {
      console.log("err", err);
      res.status(500).json({ message: err });
    }
  }
);

export default router;
