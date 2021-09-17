const db = require('./app/models');
const User = db.user;
const Role = db.role;
const Game = db.game;
const Equipment = db.equipment;
const Player_equipment = db.player_equipment;

// eslint-disable-next-line no-unused-vars
function initial() {
  User.create({
    username: 'fabian',
    email: 'fabian.mutschler@epitech.eu',
    password: '$2b$10$nYwkqMAFZKttMG6SgzrC4OIJUV1ly14G8aYj/5oGeiyckHITjWioi'
  }).then((user) => {
    user.setRoles(2);
  });

  User.create({
    username: 'user',
    email: 'test@test.eu',
    password: '$2b$10$nYwkqMAFZKttMG6SgzrC4OIJUV1ly14G8aYj/5oGeiyckHITjWioi'
  }).then((user) => {
    user.setRoles(1);
  });

  User.create({
    username: 'testplayer',
    email: 'test@player.eu',
    password: '$2b$10$nYwkqMAFZKttMG6SgzrC4OIJUV1ly14G8aYj/5oGeiyckHITjWioi'
  }).then((user) => {
    user.setRoles(1);
  });

  User.create({
    username: 'testmj',
    email: 'test@mj.eu',
    password: '$2b$10$nYwkqMAFZKttMG6SgzrC4OIJUV1ly14G8aYj/5oGeiyckHITjWioi'
  }).then((user) => {
    user.setRoles(1);
  });

  Role.create({
    id: 1,
    name: 'user'
  });

  Role.create({
    id: 2,
    name: 'admin'
  });

  Game.create({
    name: 'lalaventure',
    password: '$2b$10$nYwkqMAFZKttMG6SgzrC4OIJUV1ly14G8aYj/5oGeiyckHITjWioi',
    ownerId: 4
  }).then((game) => {
    game.setUsers(4);
    game.addUsers(3);
  });

  Game.create({
    name: 'test',
    password: '$2b$10$nYwkqMAFZKttMG6SgzrC4OIJUV1ly14G8aYj/5oGeiyckHITjWioi',
    ownerId: 1
  }).then((game) => {
    game.setUsers(1);
    game.addUsers(2);
  });

  Game.create({
    name: 'test2',
    password: '$2b$10$nYwkqMAFZKttMG6SgzrC4OIJUV1ly14G8aYj/5oGeiyckHITjWioi',
    ownerId: 1
  }).then((game) => {
    game.setUsers(1);
  });

  Game.create({
    name: 'test3',
    password: '$2b$10$nYwkqMAFZKttMG6SgzrC4OIJUV1ly14G8aYj/5oGeiyckHITjWioi',
    ownerId: 2
  }).then((game) => {
    game.setUsers(2);
    game.addUsers(1);
  });

  Equipment.create({
    name: 'épée',
    description: "c'est une épée",
    stats: '{attaque:10}',
    type: 'weapon',
    weight: 20,
    slots: 'hand'
  });

  Equipment.create({
    name: 'bottes',
    description: 'ce sont des bottes',
    stats: '{defense:10}',
    type: 'armor',
    weight: 10,
    slots: 'foot'
  });

  Equipment.create({
    name: 'armure',
    description: "c'est une armure",
    stats: '{defense:100}',
    type: 'armor',
    weight: 40,
    slots: 'body'
  });

  Player_equipment.create({
    equiped: 1,
    userId: 1,
    gameId: 1,
    equipmentId: 1
  });

  Player_equipment.create({
    equiped: 1,
    userId: 1,
    gameId: 2,
    equipmentId: 1
  });

  Player_equipment.create({
    equiped: 1,
    userId: 1,
    gameId: 2,
    equipmentId: 2
  });

  Player_equipment.create({
    equiped: 1,
    userId: 1,
    gameId: 1,
    equipmentId: 1
  });

  Player_equipment.create({
    equiped: 1,
    userId: 2,
    gameId: 3,
    equipmentId: 1
  });

  Player_equipment.create({
    equiped: 1,
    userId: 2,
    gameId: 3,
    equipmentId: 2
  });
}

module.exports = { initial };
