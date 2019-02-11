const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require('../models/user')

router.post('/signup', (req, res, next) => {
    
    // Check if user is not unique
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(422).json({
                message: 'Email already exists'
            });
        } else {

    // Hash password, if successful, save new User
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash  
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
        }
    });
    }
})   
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
        if (result) {
          return res.status(200).json({
            message: 'Auth success'
          })
        }
        return res.status(401).json({
          message: 'Auth failed'
        })
      })
    })
    .catch(err => {
      console.log(err);
      res.status.json({
        error: err
      });
    });
});

router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;