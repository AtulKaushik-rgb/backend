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
    data = output.filter(items => items.type == 401);
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
    data = output.filter(items => items.type == 400);
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
    data = output.filter(items => items.type == 402);
  } catch (error) {
    res.send("inside catch");
  }
  if (!data) res.status(404).send("error");

  res.send(data);
});

router.get("/search", async function (req, res, next) {
  let data = null;
  try {
    //var id = req;
    console.log(req.query);
    console.log('inside when search occures')
    const response = await axios.get(process.env.hostUrl + "/items");
    const output = response.data;

    //console.log(output);
    if(req.query.q !=='all')
    data = output.filter(items => items.title === req.query.q);
    else
    data = output;
    
   if(req.query.max)
   {
     console.log('max is '+req.query.max)
     console.log(data.filter(items=>parseInt(items.prices) <= parseInt(req.query.max)));
     data = data.filter(items=>parseInt(items.prices) <= parseInt(req.query.max) )
     console.log(data.map(item=>item.prices));
   // console.log(data);
    
    if(req.query.star)
    {
      console.log(req.query.star);
      data = data.filter(items=>items.customer_rating >= req.query.star)
    }
    //console.log(data);

    console.log('after all filters');
    console.log('total length of data is '+data.length);
  }
}catch (error) {
    console.log('error happened');
    res.send("inside catch");
  }
  if (!data) res.status(404).send("error");

  res.send(data);
});

module.exports = router;
