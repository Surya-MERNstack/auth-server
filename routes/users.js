var express = require("express");
var router = express.Router();
const { GetAllUsers, UpdateProfile } = require("../Controller/usersController");
const { AuthorizeUser } = require("../Controller/loginController");

router.get("/", async function (req, res, next) {
  try {
    res.json(await GetAllUsers());
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Busy");
  }
});

router.post("/update", async function (req, res, next) {
  const profileData = await req.body;
  const auth_token = req.headers.authorization.split(" ")[1];
  try {
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(200).send("Invalid");
    } else {
      res.json(await UpdateProfile(loginCredentials._id,profileData));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy");
  }
});

module.exports = router;