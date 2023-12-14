const mongoose = require("mongoose");
const Questions = require("../Models/Questions");

async function PostAnswer(
  _id,
  noOfAnswers,
  answerBody,
  userEmail,
  userAnswered
) {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return "Invalid";
  }
  try {
    updateNoOfAnswers(_id, noOfAnswers);
    await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userEmail }] },
    });
    return true;
  } catch (error) {
    return "Server Busy";
  }
}

const updateNoOfAnswers = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

async function DeleteAnswer(_id,answerId,noOfAnswers, email) {
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return "Invalid";
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
      return "Invalid";
    }
    updateNoOfAnswers(_id, noOfAnswers);
    const question = await Questions.findOne({ _id: _id });
    const answerToDelete = question.answer.find((ans) => ans._id.toString() === answerId);
    if (answerToDelete.userEmail === email) {
      console.log(question.userEmail)
      await Questions.updateOne(
        { _id },
        { $pull: { answer: { _id: answerId } } }
      );
      return true;
    }
    return "Invalid";
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

module.exports = { PostAnswer,DeleteAnswer };
