const User = require('../model/userModel.js');

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({
      status: 'success',
      message: data,
    });
  } catch (err) {
    console.log(err);
  }
};
const addUser = async (req, res) => {
  try {
    const data = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      message: data,
    });
  } catch (err) {
    console.log(err);
  }
};
const getUser = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      message: data,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: data,
    });
  } catch (err) {
    console.log(err);
  }
};
const updateUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      message: data,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllUsers, getUser, deleteUser, updateUser, addUser };
