const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWTGenerateToken = require("../utils//JWTGenerateToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middleware/allowedTo");
// const asyncHandler = require("../middleware/asyncHandler");

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: httpStatusText.FAIL, data: errors.array() });
    }

    const olduser = await userModel.findOne({ email });
    if (olduser) {
      return res.status(400).json("user is already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new userModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const token = await JWTGenerateToken({
      email: newuser.email,
      id: newuser._id,
      role: newuser.role,
    });
    newuser.token = token;
    await newuser.save();
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { newuser } });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: errors.array() });
  }
  const oldUser = await userModel.findOne({ email: email });
  if (!oldUser) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      message: "User not found Please Register first",
    });
  }
  const matchedPassword = await bcrypt.compare(password, oldUser.password);
  if (oldUser && matchedPassword) {
    const token = await JWTGenerateToken({
      email: oldUser.email,
      id: oldUser._id,
      role: oldUser.role,
    });

    const { firstname, lastname, email, id, role } = oldUser;

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { token, firstname, lastname, email, id, role },
    });
  }
  if (!matchedPassword) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      message: "Please enter correct password",
    });
  }
};

// @des logout/clear cookie
// @route Post/api/users
// @private public

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @des get user profile
// @route Get/api/users/profile
// @private public

const getUserProfile = async (req, res) => {
  res.send("user profile");
};

// @des update user profile
// @route Put/api/users/profile
// @private private

const updateUserProfile = async (req, res) => {
  const user = await userModel.findById(req.body.id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }

    // not check
    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      role: updatedUser.role,
      token: updatedUser.token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
// @des get users
// @route Get/api/users
// @private/Admin

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
  } catch (err) {
    res.status(404).json({ status: httpStatusText.FAIL, msg: err.message });
  }
};

// @des get user by ID
// @route Get/api/users/:id
// @private/Admin

// not check
const getUserByID = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (user) {
      return res
        .status(200)
        .json({ status: httpStatusText.SUCCESS, data: { user } });
    } else {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "User not found",
      });
    }
  } catch (err) {
    return res
      .status(404)
      .json({ status: httpStatusText.FAIL, msg: err.message });
  }
};

// @des delete users
// @route Delete/api/users/:id
// @private/Admin

//not check
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (user) {
      if (user.role == userRoles.ADMIN) {
        return res.status(400).json({
          status: httpStatusText.FAIL,
          msg: "Can not delete admin user",
        });
      }
      await userModel.deleteOne({ _id: user._id });
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "User not found",
      });
    }
  } catch (err) {
    return res
      .status(404)
      .json({ status: httpStatusText.FAIL, msg: err.message });
  }
};

// @des Update user
// @route PUT/api/users/:id
// @private/Admin

const UpdateUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    console.log(user);
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      role: updatedUser.role,
    });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUserByID,
  getUserProfile,
  deleteUser,
  updateUserProfile,
  UpdateUser,
  logoutUser,
};
