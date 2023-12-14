const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const questionSchema = mongoose.Schema(
  {
    questionTitle: {
      type: String,
      required: true,
    },
    questionBody: {
      type: String,
      required: true,
    },
    questionTags: {
      type: [String],
      
    },
    noOfAnswers: {
      type: Number,
      default: 0,
    },
    upVote: {
      type: [String],
      default: [],
    },
    downVote: {
      type: [String],
      default: [],
    },
    userPosted: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    askedOn: {
      type: Date,
      default: Date.now,
    },
    answer: [
      {
        answerBody: String,
        userAnswered: String,
        userEmail: String,
        answeredOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { collection: "Questions" }
);

module.exports = mongoose.model("Questions", questionSchema);
