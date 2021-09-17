module.exports = (sequelize, Sequelize) => {
  const equipment = sequelize.define(
    'equipments',
    {
      name: {
        type: Sequelize.STRING(100)
      },
      stats: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.INTEGER
      },
      slots: {
        type: Sequelize.STRING
      }
    },
    { timestamps: false }
  );

  return equipment;
};
