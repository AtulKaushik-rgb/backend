require("dotenv/config");
var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET prices listing. */
router.get("/", async function (req, res, next) {
  let data = null;
  try {
    const response = await axios.get(process.env.hostUrl + req.originalUrl);
    data = await response.data;
  } catch (error) {
    res.send("inside catch");
  }
  if (!data) res.status(404).send("error");

  res.send(data);
});
module.exports = router;
