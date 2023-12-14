var express = require("express");
var router = express.Router();
const { AuthenticateUser } = require("../Controller/loginController");

router.post("/", async function (req, res, next) {
  try {
    const { email, password } = await req.body;
    var loginCredentials = await AuthenticateUser(email, password);
    if (loginCredentials === false) {
      res.status(200).send(false);
    } else {
      res.status(200).send(loginCredentials);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Busy");
  }
});

module.exports = router;
