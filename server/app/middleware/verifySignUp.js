const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

// Check if username or email exists
const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    if (user) {
      return res.status(200).send({
        message: 'Failed! Username is already in use!'
      });
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (user) {
        return res.status(200).send({
          message: 'Failed! Email is already in use!'
        });
      }

      next();
    });
  });
};

// Check if role exists
const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(200).send({
          message: 'Failed! Role does not exist = ' + req.body.roles[i]
        });
      }
    }
  }

  next();
};

// Check username data
const checkUserName = (req, res, next) => {
  const username = req.body.username.trim();
  // if empty or white spaced
  if (!username) {
    return res.status(200).send({
      message: 'Failed! Username cannot be empty.'
    });
  }

  // if < 4 characters
  if (username.length < 4) {
    return res.status(200).send({
      message: 'Failed! Username must have at least 4 characters.'
    });
  }

  // if > 20 characters
  if (username.length > 20) {
    return res.status(200).send({
      message: 'Failed! Username must have max 20 characters.'
    });
  }

  // if not match regex
  if (!username.match(/^[\w.-]+$/)) {
    return res.status(200).send({
      message: 'Failed! username does not match REGEX.'
    });
  }

  next();
};

// Check email data
const checkEmail = (req, res, next) => {
  const email = req.body.email.trim();
  // if empty or white spaced
  if (!email) {
    return res.status(200).send({
      message: 'Failed! email cannot be empty.'
    });
  }

  // if not match regex
  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    return res.status(200).send({
      message: 'Failed! email does not match REGEX.'
    });
  }

  // if email != emailCheck
  if (email != req.body.emailCheck.trim()) {
    return res.status(200).send({
      message: 'Failed! email does not match email check.'
    });
  }

  next();
};

// Check password data
const checkPassword = (req, res, next) => {
  const password = req.body.password.trim();
  // if empty or white spaced
  if (!password) {
    return res.status(200).send({
      message: 'Failed! password cannot be empty.'
    });
  }

  // if < 8 characters
  if (password.length < 8) {
    return res.status(200).send({
      message: 'Failed! password must have at least 8 characters.'
    });
  }

  // if not match regex
  if (!password.match(/^[^\s]+$/)) {
    return res.status(200).send({
      message: 'Failed! password does not match REGEX.'
    });
  }

  // if password != passwordCheck
  if (password != req.body.passwordCheck.trim()) {
    return res.status(200).send({
      message: 'Failed! password does not match password check.'
    });
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
  checkUserName: checkUserName,
  checkEmail: checkEmail,
  checkPassword: checkPassword
};

module.exports = verifySignUp;
