const express = require('express');
const mongoose = require('mongoose');
const unirest = require('unirest');
const router = express.Router();

//display json file from API 
const key = process.env.OPENWEATHER_APIKEY;

router.get('/weather', function (req, res) {
  unirest.get('http://api.openweathermap.org/data/2.5/weather?lat=' + req.query.lat + '&lon=' + req.query.lon + '&units=metric&appid=' + key)
    .then(function (response) {
      console.log("response.body", response);
      res.json(response.body)
    })
});

module.exports = router;