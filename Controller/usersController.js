const mongoose = require("mongoose");
const User = require("../Models/User");

async function GetAllUsers() {
  try {
    const userList = await User.find().lean();
    return userList;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

async function UpdateProfile(id,profileData) {
  console.log(id,profileData)
  try {
    const user = await User.findOne(id);
    user.name=profileData.name;
    user.about=profileData.about;
    user.tags=profileData.tags.split(" ");
    user.save();
    return true;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}
module.exports = { GetAllUsers, UpdateProfile };
