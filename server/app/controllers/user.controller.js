const db = require('../models');
const User = db.user;

let bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getUserById = (req, res) => {
  User.findByPk(req.query.userId)
    .then((user) => {
      if (user) res.status(200).send(user);
      else res.status(200).send({ message: 'Aucun utilisateur trouvé.' });
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getCurrentUser = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.updateUser = (req, res) => {
  User.findByPk(req.body.userId)
    .then(async (user) => {
      if (user) {
        user.username = req.body.username;
        user.password = bcrypt.hashSync(req.body.password, 10);
        await user.save();
        res.status(200).send({ message: 'Utilisateur mis à jour.' });
      } else {
        res.status(200).send({ message: 'Aucun utilisateur trouvé.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.deleteUser = async (req, res) => {
  User.findByPk(req.body.userId)
    .then(async (user) => {
      if (user) {
        await user.destroy();
        res.status(200).send({ message: 'Utilisateur supprimé.' });
      } else {
        res.status(200).send({ message: 'Aucun utilisateur trouvé.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};
