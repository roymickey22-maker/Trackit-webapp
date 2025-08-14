import { User } from "../models/users.models.js";
import jwt from "jsonwebtoken";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const signUpUser = asyncHandler(async (req, res) => {
  const { name, password, email, phone } = req.body;
  console.log("This is req.body   ",req.body);

  if (
    [name, password, email, phone].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!/^\d{10}$/.test(phone)) {
  throw new ApiError(400, "Phone should have exactly 10 digits");
}

  // check for already existence of the user
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    throw new ApiError(409, "User already registered");
  }

  // user is good to get entry in database
  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  // Now check if the user has been created or not
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something happen while creating User");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

export { signUpUser };
