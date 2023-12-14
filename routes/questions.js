var express = require("express");
var router = express.Router();
const { AuthorizeUser } = require("../Controller/loginController");
const {
  AskQuestion,
  GetAllQuestion,
  DeleteQuestion,
  voteQuestion,
} = require("../Controller/questionsController");

router.get("/", async function (req, res, next) {
  try {
    res.json(await GetAllQuestion());
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Busy");
  }
});

router.post("/ask", async function (req, res, next) {
  const auth_token = req.headers.authorization.split(" ")[1];
  const newQuestion = req.body;
  try {
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(400).send("Invalid");
    } else {
      res.json(await AskQuestion(newQuestion, loginCredentials.email,loginCredentials.name));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy");
  }
});

router.delete("/delete/:id", async function (req, res, next) {
  try {
    const auth_token = req.headers.authorization.split(" ")[1];
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(200).send("Invalid");
    } else {
      res.json(await DeleteQuestion(req.params.id, loginCredentials.email));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy");
  }
});

router.post("/vote/:id", async function (req, res, next) {
  try {
    const {voteValue} = await req.body;
    const auth_token = req.headers.authorization.split(" ")[1];
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(200).send("Invalid");
    } else {
      res.status(200).send(await voteQuestion(req.params.id,voteValue,loginCredentials.email));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy");
  }
});

module.exports = router;
