require("dotenv/config");
var express = require("express");
var router = express.Router();
var axios = require("axios");
const { json } = require("express");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let data = null;
  try {
    const response = await axios.get(process.env.hostUrl + "/items");
    data = await response.data;
  } catch (error) {
    res.send("inside catch");
  }
  if (!data) res.status(404).send("error");

  res.send(data);
});

router.get("/books", async function (req, res, next) {
  let data = null;
  try {
    const response = await axios.get(process.env.hostUrl + "/items");
    const output = response.data;
    data = output.filter((items) => items.type == 401);
  } catch (error) {
    res.send("inside catch");
  }
  if (!data) res.status(404).send("error");

  res.send(data);
});

router.get("/clothes", async function (req, res, next) {
  let data = null;
  try {
    const response = await axios.get(process.env.hostUrl + "/items");
    const output = response.data;
    data = output.filter((items) => items.type == 400);
  } catch (error) {
    res.send("inside catch");
  }
  if (!data) res.status(404).send("error");

  res.send(data);
});

router.get("/phones", async function (req, res, next) {
  let data = null;
  try {
    const response = await axios.get(process.env.hostUrl + "/items");
    const output = response.data;
    data = output.filter((items) => items.type == 402);
  } catch (error) {
    res.send("inside catch");
  }
  if (!data) res.status(404).send("error");

  res.send(data);
});

router.get("/search", async function (req, res, next) {
  let data = null;
  try {
    const response = await axios.get(process.env.hostUrl + "/items");
    const output = response.data;

    //console.log(output);
    if (req.query.q !== "all")
      data = output.filter(
        (items) => items.title.toLowerCase() === req.query.q.toLowerCase()
      );
    else data = output;

    if (req.query.max) {
      data = data.filter(
        (items) => parseInt(items.prices) <= parseInt(req.query.max)
      );

      if (req.query.brands && req.query.brands.length != 5) {
        var numberArray = JSON.parse(req.query.brands).map(function (item) {
          return parseInt(item);
        });

        if (numberArray.length != 5)
          data = data.filter((items) =>
            numberArray.includes(parseInt(items.brand))
          );
      }

      if (req.query.star != 1)
        data = data.filter(
          (items) => parseInt(items.customer_rating) >= parseInt(req.query.star)
        );
    }
  } catch (error) {
    console.log("error happened");
    res.send("inside catch");
  }
  if (!data) res.status(404).send("error");

  res.send(data);
});

module.exports = router;
