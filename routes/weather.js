const express = require('express');
const mongoose = require('mongoose');
const unirest = require('unirest');
const router = express.Router();

// function weatherBalloon(lat, lon) {
//   const key = '{process.env.OPENWEATHER_APIKEY}';
//   fetch('api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key)
//     .then(function (resp) { return resp.json() }) // Convert data to json
//     .then(function (data) {
//       console.log(data);
//     })
//     .catch(function () {
//       // catch any errors
//     });
// }

// window.onload = function () {
//   weatherBalloon(52, 13);
// }


//display json file from API 
const key = process.env.OPENWEATHER_APIKEY;

// unirest.get('api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key)
router.get('/weather', (req, res) => {
unirest.get('api.openweathermap.org/data/2.5/weather?lat=' + 52 + '&lon=' + 13 + '&appid=' + key)
.then(function (res) { 
  console.log(res.json());
  return res.json()   
})
.then(function (data) {
  console.log(data);
})
.catch(function () {
  // catch for errors
})
});

// api.openweathermap.org/data/2.5/weather?lat=52&lon=13&appid=9dbf0cbbc448374215ef1182c1bb03b7

module.exports=router;