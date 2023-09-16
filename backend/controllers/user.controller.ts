import { Handler } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";
// @desc Auth user and set token
// @route POST /api/users/auth
// @access Public

const _authUserHandler: Handler = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id.toString());
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
};
const authUser = asyncHandler(_authUserHandler);

// @desc Register user and get token
// @route POST /api/users
// @access Public

const _registerUserHandler: Handler = async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id.toString());
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};
const registerUser = asyncHandler(_registerUserHandler);

// @desc Logout user and delete token
// @route POST /api/users/logout
// @access Public

const _logoutUserHandler: Handler = async (req, res, next) => {
  // res.cookie("token", "", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   expires: new Date(0),
  // });
  res.clearCookie("token");
  res.status(200).json({ message: "User Logged out" });
};
const logoutUser = asyncHandler(_logoutUserHandler);

// @desc Gets user profile
// @route GET /api/users/profile
// @access Private

const _getUserProfileHandler: Handler = async (req, res, next) => {
  const user = {
    // @ts-ignore
    id: req.user._id,
    // @ts-ignore
    name: req.user.name,
    // @ts-ignore
    email: req.user.email,
  };
  res.status(200).json({ user });
};
const getUserProfile = asyncHandler(_getUserProfileHandler);

// @desc Logout user and delete token
// @route PUT /api/users/profile
// @access Private

const _updateUserProfileHandler: Handler = async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    //@ts-ignore
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true }
  );
  if (updatedUser) {
    if (req.body.password) {
      updatedUser.password = req.body.password;
      await updatedUser.save();
    }
    res.status(200).json({
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
const updateUserProfile = asyncHandler(_updateUserProfileHandler);

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
