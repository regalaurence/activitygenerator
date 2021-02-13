// https://www.google.com/maps/embed/v1/MAP_MODE?key={YOUR_MAP_KEY}&parameters

// https://maps.googleapis.com/maps/api/js?key=AIzaSyAA3eyRHmy29LGFwvHML4QuQrvuko7Zog4

const express = require('express');
const mongoose = require('mongoose');
const unirest = require('unirest');
const router = express.Router();

//display json file from API 
const key = process.env.YOUR_MAP_KEY;

router.get('/maps', function (req, res) {
  unirest.get('http://www.bing.com/api/maps/mapcontrol?callback=GetMap&branch=experimental&key=' + key)
    .then(function (response) {
      console.log("response.body", response);
      res.json(response.body)
    })
});

module.exports = router;