const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const Organisation = require("../models/Organisation.js");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  try {
    console.log("data", data);
    const { name, email, password, role, organisation } = data;

    const existingUser = await User.findOne({ email });
    console.log("existingUser", existingUser);

    if (existingUser) {
      throw new Error("User already Created, try sign in!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let isOrganisation = await Organisation.findOne({
      name: organisation.trim().toLowerCase(),
    });

    if (!isOrganisation) {
      isOrganisation = await Organisation.create({
        name: organisation.trim().toLowerCase(),
      });
    }

    const registeredUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      organisation: isOrganisation._id,
    });

    return registeredUser;
  } catch (error) {
    console.log("error", error);
    throw new Error(`Unable to create user, ${error.message}`);
  }
};

const login = async (data) => {
  try {
    const { email, password } = data;
    const existingUser = await User.findOne({ email });
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      throw new Error("Login credentials are incorrect, please try again!");
    }
    const token = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
        organisation: existingUser.organisation,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    return {
      email: existingUser.email,
      role: existingUser.role,
      accessToken: token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMe = async (user) => {
  try {
    const existingUser = await User.findById(user._id);
    return existingUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateMe = async (user, data) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, data);
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerUser, login, getMe, updateMe };
