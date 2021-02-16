const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Activity = require('../models/activity-model');
// const User = require('../models/user-model'); // <== !!!
// POST route => creating a new activity
router.post('/activities', (req, res) => {
  Activity.create({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    minDuration: req.body.minDuration,
    creator: req.body.creator,
    // ? return User.findByIdAndUpdate(user, { $push: { bookmarkedActivities: dbActivity._id } });
    categories: req.body.categories,
    timeWindowStart: req.body.timeWindowStart,
    timeWindowEnd: req.body.timeWindowEnd,
    hasCost: false,
    isHighPriority: false,
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
  // console.log('Looking for activities...');
  Activity.find()
    .then((allTheActivities) => {
      // console.log('Found activities, send to frontend');
      res.json(allTheActivities);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET route => to get all activities of a specific user !! Needs to be updated!!!
router.get('/user-activities', (req, res) => {
  // console.log('Looking for activities...');
  Activity.find()
    .then((allTheActivities) => {
      // console.log('Found activities, send to frontend');
      res.json(allTheActivities);
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.post('/add-activity', () => {
//   console.log('lets add activities');
// });

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



// PUT route => customize a specific ACTIVITY
router.put('/activities/:id', (req, res) => {
  console.log("Trying to update activity")
  console.log(req.params.id)
  console.log(req.body)
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  return Activity.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(() => {
      res.json({ message: `Activity with ${req.params.id} is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});



// POST route => customize a specific ACTIVITY
router.put('/activities/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  return Activity.findByIdAndUpdate(req.params.id, req.body, {new: true})
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
