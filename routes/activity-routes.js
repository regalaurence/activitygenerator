const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Activity = require('../models/activity-model');
// const User = require('../models/user-model'); // <== !!!
// POST route => creating a new activity
router.post('/activities', (req, res) => {
  Activity.create({
    name: req.body.name,
    descrption: req.body.descrption,
    minDuration: req.body.minDuration,
    creator: req.body.creator,
    // ? return User.findByIdAndUpdate(user, { $push: { bookmarkedActivities: dbActivity._id } });
    categories: req.body.categories,
    timeWindowStart: req.body.timeWindowStart,
    timeWindowEnd: req.body.timeWindowEnd,
    hasCost: false,
    seasonStart: req.body.seasonStart,
    seasonEnd: req.body.seasonEnd,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});
// GET route => to get all the activities
router.get('/activities', (req, res) => {
  console.log('Looking for activities...');
  Activity.find()
    .then((allTheActivities) => {
      console.log('Found activities, send to frontend');
      res.json(allTheActivities);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET route => to get a specific activity/detailed view
router.get('/activities/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // activities have an user' ids and
  // we can use the .populate() method to include whole users objects _______ WE DONT NEED THAT OR?
  Activity.findById(req.params.id).populate('user')
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST route => customize a specific ACTIVITY _________WE HAVE TO COPY IT FIRST ????
router.put('/activities/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // WE HAVE TO COPY IT FIRST  ?????????????? WILL WE ALSO UPDATE IT WITHOUT POSTING NEW ONE??
  Activity.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Activity with ${req.params.id} is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

// DELETE route => to delete a specific activity
router.delete('/activities/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Activity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is removed successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
