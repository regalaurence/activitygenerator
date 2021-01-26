const express = require('express');
const router = express.Router();

const User = require('../models/user-model')

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


// GET /api/checkuser

router.get("/checkuser", (req, res, next) => {
  if (req.session.currentUser) {
    res.json({ userDoc: req.session.currentUser });
  } else {
    res.json({ userDoc: null });
  }
});

// /api/user-signup

router.post('/signup', (req, res, next) => {

  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPassword = bcrypt.hashSync(password, salt);

  User.create({
    username: req.body.username,
    password: hashPassword
  }).then((createdUser) => {
    res.json(createdUser) 
  })
});


// // PUT route => to update a specific user
router.put('/user/:id', (req, res, next) => {
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body).then((editedUser) => {
    res.json(editedUser)
  }).catch(err => {
          res.json(err);
        })
});

// COPIED IN CASE I MESS OUT THE CREATING COPY OF AN USER
// router.put('/user-edit', (req, res, next) => {

//   const password = req.body.password;
//   const salt = bcrypt.genSaltSync(bcryptSalt);
//   const hashPassword = bcrypt.hashSync(password, salt);

//   // Is User.create right here? I would have expected findAndUpdate?
//   User.create({
//     username: req.body.username,
//     password: hashPassword
//   }).then((createdUser) => {
//     res.json(createdUser)
//   })
// });


router.post('/login', (req, res, next) => {

  User.findOne({ username: req.body.username }).then((user) => {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.session.currentUser = user;
      res.json(user)
    }
  })

});

//logout
router.post('/logout', (req, res, next) => {
  //console.log("Session: ", req.session)
  req.session.destroy();
  res.json(null);
});

module.exports = router;