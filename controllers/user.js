const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.user_signup = (req, res, next) => {
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
              password: hash,
              admin: req.body.admin   
            });
            user.save()
            .then(result => {
            const token = jwt.sign({
              email: req.body.email,
            }, process.env.JWT_KEY,
            {
              expiresIn: "3h"
            });
                res.status(201).json({
                    message: 'User created',
                    token: token,
                    email: req.body.email
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
};

exports.user_login = (req, res, next) => {
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
         const token = jwt.sign({
            email: user[0].email,
            _id: user[0]._id,
            admin: user[0].admin
          }, process.env.JWT_KEY,
          {
            expiresIn: "3h"
          });
          return res.status(200).json({
            message: 'Auth success',
            token: token,
            user: user[0].email
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
};

exports.user_delete = (req, res, next) => {
  console.log(res.locals.userData)
    User.find({ _id: res.locals.userData._id})
      .exec()
      .then(result => {
        if (result[0]._id == req.params.userId) {
          res.status(401).json({
            message: 'Cannot delete self'
          })
        } else {
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
        }
      });
  };