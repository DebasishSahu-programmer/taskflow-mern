import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.get("Authorization");
  const token =
    req.cookies?.accessToken ||
    (authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null);

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not configured");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, secret);
  } catch {
    throw new ApiError(401, "Invalid or expired access token");
  }

  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  req.user = user;
  next();
});