var express = require("express");
var router = express.Router();
const { GetAllTags } = require("../Controller/tagsController");

router.get("/", async function (req, res, next) {
  try {
    res.json(await GetAllTags());
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Busy");
  }
});

module.exports = router;
