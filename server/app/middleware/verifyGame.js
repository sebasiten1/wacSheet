const db = require('../models');
const Game = db.game;

const isGameOwner = (req, res, next) => {
  Game.findByPk(req.body.gameId)
    .then((game) => {
      if (req.userId != game.ownerId) {
        return res.status(200).send({
          message: 'Unauthorized!'
        });
      }
      next();
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

const checkDuplicateName = (req, res, next) => {
  Game.findOne({
    where: {
      name: req.body.name
    }
  })
    .then((game) => {
      if (game) {
        return res.status(200).send({
          message: "Ce nom d'utilisateur est déjà utilisé!"
        });
      }
      next();
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

// Check password data
const checkPassword = (req, res, next) => {
  let password = req.body.password.trim();
  // if empty or white spaced
  if (!password) {
    return res.status(200).send({
      message: 'Le mot de passe ne peut pas être vide.'
    });
  }

  // if < 8 characters
  if (password.length < 8) {
    return res.status(200).send({
      message: 'Le mot de passe doit avoir au moins 8 caractères.'
    });
  }

  // if not match regex
  if (!password.match(/^[^\s]+$/)) {
    return res.status(200).send({
      message: 'Failed! password does not match REGEX.'
    });
  }

  // TODO : vérif avec updateGame
  // if password != passwordCheck
  if (password != req.body.passwordCheck.trim()) {
    return res.status(200).send({
      message: 'Les deux chmamps de mot de passe doivent être identiques.'
    });
  }

  next();
};

const verifyGame = {
  isGameOwner: isGameOwner,
  checkDuplicateName: checkDuplicateName,
  checkPassword: checkPassword
};
module.exports = verifyGame;
