const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');
const User = require('../models/user-model');

const bcryptSalt = 10;

// GET /api/checkuser

router.get('/checkuser', (req, res) => {
  if (req.session.currentUserId) {
    User.findById(req.session.currentUserId).then((user) => {
      res.json({ userDoc: user });
    });
  } else {
    res.json({ userDoc: null });
  }
});

// /api/user-signup

router.post('/signup', (req, res) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPassword = bcrypt.hashSync(password, salt);

  User.create({
    username: req.body.username,
    password: hashPassword,
  }).then((createdUser) => {
    res.json(createdUser);
  });
});

// // PUT route => to update a specific user
router.put('/user/:id', (req, res) => {
  console.log("Calling user update")
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body).then((editedUser) => {
    res.json(editedUser);
  }).catch((err) => {
    res.json(err);
  });
});

router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      // eslint-disable-next-line no-underscore-dangle
      req.session.currentUserId = user._id;
      res.json(user);
    }
  });
});

// logout
router.post('/logout', (req, res) => {
  // console.log("Session: ", req.session)
  req.session.destroy();
  res.json(null);
});

module.exports = router;
