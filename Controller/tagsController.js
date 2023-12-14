const mongoose = require("mongoose");
const Tags = require("../Models/Tags");

async function GetAllTags() {
  try {
    const tagList = await Tags.find().lean();
    return tagList;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

module.exports = { GetAllTags };
