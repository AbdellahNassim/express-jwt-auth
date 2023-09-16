import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";

const _protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "string") {
      decoded = JSON.parse(decoded) as { userId: string };
    }
    // @ts-ignore
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
};

const protect = asyncHandler(_protect);

export { protect };
