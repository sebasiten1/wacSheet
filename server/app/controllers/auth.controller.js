const env = require('../config/env');
const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const nodemailer = require('nodemailer');
const CryptoJS = require('crypto-js');

const transporter = nodemailer.createTransport({
  port: env.mailOptions.port,
  ignoreTLS: env.mailOptions.ignoreTLS
});

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.status(200).send({ message: 'User registered successfully!' });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.status(200).send({ message: 'User registered successfully!' });
        });
      }
    })
    .catch((err) => {
      res.status(200).send({ message: err });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(200).send({ message: 'User Not found.' });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(200).send({
          accessToken: null,
          message: 'Invalid Password!'
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        // expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          userId: user.id,
          username: user.username,
          email: user.email,
          accessToken: token
        });
      });
    })
    .catch((err) => {
      res.status(200).send({ message: err });
    });
};

exports.forgotPassword = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(200).send({ message: 'User Not found.' });
      } else {
        let token = jwt.sign({ email: req.body.email }, config.secret, {
          expiresIn: 900 // 15 minutes
        });

        let encrypt = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(token));

        let mailOptions = {
          from: env.mailOptions.from,
          to: req.body.email,
          subject: 'Réinitialisation du mot de passe',
          // text: 'That was easy!',
          html: `<p>Changez votre mot de passe <a href="${env.PROTOCOL}://${env.HOST}:3000/reset/${encrypt}">ici</a>. Ce lien expirera dans 15 minutes.</p>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return res.status(200).send({ message: 'Un email a été envoyé.', token: token });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.resetPassword = (req, res) => {
  let decrypt = CryptoJS.enc.Base64.parse(req.body.token).toString(CryptoJS.enc.Utf8);
  jwt.verify(decrypt, config.secret, (err, decoded) => {
    if (err) {
      return res.status(200).send({
        message: err
      });
    }

    User.findOne({
      where: {
        email: decoded.email
      }
    })
      .then((user) => {
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.save();
      })
      .catch((err) => {
        res.status(200).send(err);
      });

    return res.status(200).send({ message: 'Mot de passe réinitialisé.' });
  });
};

exports.checkToken = (req, res) => {
  let data = JSON.parse(req.body.data);

  jwt.verify(data.accessToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(200).send({
        message: err
      });
    }

    User.findOne({
      where: {
        id: decoded.id
      }
    })
      .then((user) => {
        if (user.id != data.userId || user.username != data.username || user.email != data.email)
          res.status(200).send(false);
        else res.status(200).send(true);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
  });
};
