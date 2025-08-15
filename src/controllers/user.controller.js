import { User } from "../models/users.models.js";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const options = {
  httpOnly: true,
  secure: true // secure only in production
};

// Generate tokens
const generateAcessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
      if(!user){
        throw new ApiError(401,'unauthorized user');
      }
    // console.log(user.toObject());

    const accessToken = user.generateAccessToken();
    console.log("error for this" ,accessToken);
    const refreshToken = user.generateRefreshToken();
    //console.log(accessToken);
     user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access Token"
    );
  }
};

// Sign up controller
const signUpUser = asyncHandler(async (req, res) => {
  const { name, password, email, phone } = req.body;

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

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    throw new ApiError(409, "User already registered");
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something happened while creating User");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

// Login controller
const loginUser = asyncHandler(async (req, res) => {
  const { name, password, email, phone } = req.body;

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

  // find user with password included
  const user = await User.findOne({ email }).select(" -refreshToken");
  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid || phone !== user.phone || name !== user.name) {
    throw new ApiError(401, "Credentials given are wrong");
  }

  // generate tokens
  const { refreshToken, accessToken } = await generateAcessAndRefreshTokens(
    user?._id
  );

  // get safe user object
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

export { signUpUser, loginUser };
