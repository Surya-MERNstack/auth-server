var express = require("express");
var router = express.Router();
const { AuthorizeUser } = require("../Controller/loginController");
const { PostAnswer, DeleteAnswer } = require("../Controller/answerController");


router.post("/new/:id", async function (req, res, next) {
  const auth_token = req.headers.authorization.split(" ")[1];
  const { id,noOfAnswers,answerBody } = req.body;
  try {
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(400).send("Invalid");
    } else {
      res.json(await  PostAnswer(id,noOfAnswers,answerBody,loginCredentials.email,loginCredentials.name));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy");
  }
});

router.post("/delete/:id", async function (req, res, next) {
  try {
    const { answerId,noOfAnswers } = await req.body;
    const auth_token = req.headers.authorization.split(" ")[1];
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(200).send("Invalid");
    } else {
      res.json(await DeleteAnswer(req.params.id,answerId,noOfAnswers, loginCredentials.email));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy");
  }
});

module.exports = router;
