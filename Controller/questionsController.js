const mongoose = require("mongoose");
const Questions = require("../Models/Questions");

async function AskQuestion(newQuestion, email, name) {
  try {
    const newQuestionDB = new Questions({
      questionTitle: newQuestion.questionTitle,
      questionBody: newQuestion.questionBody,
      questionTags: newQuestion.questionTags.split(" "),
      userEmail: email,
      userPosted: name,
    });
    await newQuestionDB.save();
    return true;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

async function GetAllQuestion() {
  try {
    const questionList = await Questions.find().lean().sort({ askedOn: -1 });
    return questionList;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

async function DeleteQuestion(id, email) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "Invalid";
    }
    const question = await Questions.findOne({ _id: id });
    if (question.userEmail === email) {
      console.log(question.userEmail);
      await Questions.deleteOne({ _id: id });
      return true;
    }
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

async function voteQuestion(id, voteValue, email) {
  console.log(id, voteValue, email)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid");
  }
  try {
    const question = await Questions.findById(id);
    const upIndex = question.upVote.findIndex((email) => email === email);
    const downIndex = question.downVote.findIndex((email) => email === email);
    if (voteValue === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (email) => email !== email
        );
      }
      if (upIndex === -1) {
        question.upVote.push(email);
        console.log(question.upVote)
      }
      else {
        question.upVote = question.upVote.filter((email) => email !== email);
        console.log(question.upVote)
      }
    } else if (voteValue === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((email) => email !== email);
      }
      if (downIndex === -1) {
        question.downVote.push(email);
      }
      else {
        question.downVote = question.downVote.filter((email) => email !== email );
      }
    }
    await Questions.findByIdAndUpdate(id, question);
    return true;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}
module.exports = { AskQuestion, GetAllQuestion, DeleteQuestion, voteQuestion };
