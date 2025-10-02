import User from "../models/userModel.js";

// get all the users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// get the individual users
export const getUser = async (req, res, next) => {
  try {
    // try to get all the details of the user except the password
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// create a new user


// update the user details


// Delete the user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne(req.params.id);
  } catch (error) {
    next(error);
  }
};
