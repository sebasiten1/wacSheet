const db = require('../models');
const Equipment = db.equipment;
const Player_equipment = db.player_equipment;

exports.createEquipment = (req, res) => {
  Equipment.create({
    name: req.body.name,
    stats: req.body.stats,
    description: req.body.description,
    type: req.body.type,
    weight: req.body.weight,
    slots: req.body.slots
  })
    .then(() => {
      res.status(200).send({ message: "L'équipement a été ajouté." });
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getEquipments = (req, res) => {
  Equipment.findAll()
    .then((equipments) => {
      res.status(200).send(equipments);
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getEquipmentById = (req, res) => {
  Equipment.findByPk(req.query.equipmentId)
    .then((equipment) => {
      if (equipment) res.status(200).send(equipment);
      else res.status(200).send({ message: 'Aucun équipement trouvé.' });
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.updateEquipment = (req, res) => {
  Equipment.findByPk(req.body.equipmentId)
    .then(async (equipment) => {
      if (equipment) {
        equipment.name = req.body.name;
        equipment.stats = req.body.stats;
        equipment.description = req.body.description;
        equipment.type = req.body.type;
        equipment.weight = req.body.weight;
        equipment.slots = req.body.slots;
        await equipment.save();
        res.status(200).send({ message: "L'équipement a été mis à jour." });
      } else {
        res.status(200).send({ message: 'Aucun équipement trouvé.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.deleteEquipment = (req, res) => {
  Equipment.findByPk(req.body.equipmentId)
    .then(async (equipment) => {
      if (equipment) {
        await equipment.destroy();
        res.status(200).send({ message: "L'équipement a été supprimé" });
      } else {
        res.status(200).send({ message: 'Aucun équipement trouvé.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getCurrentPlayerEquipments = (req, res) => {
  Player_equipment.findAndCountAll({
    where: { gameId: req.query.gameId, userId: req.userId },
    attributes: ['id'],
    include: [
      {
        model: Equipment
      }
    ]
  })
    .then((player_equipments) => {
      if (player_equipments.count > 0) res.status(200).send(player_equipments.rows);
      else res.status(200).send({ message: 'Aucun équipement trouvé.' });
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.addPlayerEquipment = (req, res) => {
  Player_equipment.create({
    gameId: req.body.gameId,
    userId: req.body.playerId,
    equipmentId: req.body.equipmentId
  })
    .then(() => {
      res.status(200).send({ message: 'Equipement ajouté.' });
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.removePlayerEquipment = (req, res) => {
  Player_equipment.findOne({
    where: { equipmentId: req.body.equipmentId, gameId: req.body.gameId, userId: req.userId }
  })
    .then(async (player_equipment) => {
      if (player_equipment) {
        await player_equipment.destroy();
        res.status(200).send({ message: 'Equipement supprimé.' });
      } else {
        res.status(200).send({ message: 'Aucun équipement trouvé.' });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};
