const db = require('../models');
const Game = db.game;

var bcrypt = require('bcrypt');

exports.createGame = (req, res) => {
  Game.create({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
    ownerId: req.userId
  })
    .then(async (game) => {
      await game.setUsers(req.userId);
      res.status(200).send({ message: 'Partie créée.' });
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getGames = (req, res) => {
  Game.findAll()
    .then((games) => {
      res.status(200).send(games);
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getCurrentPlayerGames = (req, res) => {
  Game.findAll({
    where: { userId: req.userId }
  })
    .then((games) => {
      res.status(200).send(games);
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getGameById = (req, res) => {
  Game.findByPk(req.query.gameId)
    .then((game) => {
      if (game) {
        res.status(200).send(game);
      } else {
        res.status(200).send({ message: 'Aucune partie trouvée.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.updateGame = (req, res) => {
  Game.findByPk(req.body.gameId)
    .then(async (game) => {
      if (game) {
        game.name = req.body.name;
        game.password = bcrypt.hashSync(req.body.password, 10);
        await game.save();
        res.status(200).send({ message: 'Partie mise à jour.' });
      } else {
        res.status(200).send({ message: 'Aucune partie trouvée.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.deleteGame = (req, res) => {
  Game.findByPk(req.body.gameId)
    .then(async (game) => {
      if (game) {
        await game.destroy();
        res.status(200).send({ message: 'Partie supprimée.' });
      } else {
        res.status(200).send({ message: 'Aucune partie trouvée.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getGmId = (req, res) => {
  Game.findByPk(req.query.gameId)
    .then((game) => {
      if (game) res.status(200).send({ ownerId: game.ownerId });
      else res.status(200).send({ message: 'Aucune partie trouvée.' });
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getPlayers = (req, res) => {
  Game.findByPk(req.query.gameId)
    .then((game) => {
      if (game) {
        game.getUsers().then((users) => {
          if (users.length > 0) res.status(200).send(users);
          else res.status(200).send({ message: 'Aucun joueur trouvé.' });
        });
      } else {
        res.status(200).send({ message: 'Aucune partie trouvée.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.addPlayer = (req, res) => {
  Game.findByPk(req.body.gameId)
    .then(async (game) => {
      if (await game.hasUser(req.body.userId)) {
        res.status(200).send({ message: "L'utilisateur est déjà dans a partie." });
      } else {
        game.addUser(req.userId);
        res.status(200).send({ message: 'Utilisateur ajouté.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.removePlayer = (req, res) => {
  Game.findByPk(req.body.gameId)
    .then(async (game) => {
      if (req.userId != game.ownerId) {
        await game.removeUser(req.body.userId);
        res.status(200).send({ message: 'Utilisateur retiré de la partie.' });
      } else {
        res
          .status(200)
          .send({ message: 'Le propriétaire de la partie ne peut pas être supprimé.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.playerExist = (req, res) => {
  Game.findByPk(req.query.gameId)
    .then((game) => {
      return game.hasUser(req.userId);
    })
    .then((game) => {
      res.status(200).send({ playerExist: game });
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};
