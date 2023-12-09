const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.user_signup = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({ message: 'Email already exists' });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                res.status(201).json({ message: 'User created' });
              })
              .catch(err => {
                res.status(500).json({ error: err });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Authorization failed' });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: 'Authorization failed' });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user.username,
              email: user.email,
              userId: user._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            }
          );
          return res.status(200).json({ message: 'Authorization successful', token: token });
        }
        res.status(401).json({ message: 'Authorization failed' });
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.user_get_by_username = (req, res) => {
  const username = req.params.username;

  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Do not send sensitive information like passwords
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        // add other fields you want to return
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

exports.user_delete = (req, res) => {
  const usernameToDelete = req.params.username;
  const authenticatedUsername = req.userData.username; // Assuming username is included in JWT token

  if (usernameToDelete !== authenticatedUsername) {
    return res.status(403).json({ message: 'Not authorized to delete this user' });
  }

  User.findOneAndDelete({ username: usernameToDelete })
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err }));
};

