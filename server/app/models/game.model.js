module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define(
    'games',
    {
      name: {
        type: Sequelize.STRING(100)
      },
      password: {
        type: Sequelize.STRING(100)
      },
      ownerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      }
    },
    { timestamps: false }
  );

  return Game;
};
