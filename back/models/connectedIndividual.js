module.exports = (sequelize, DataTypes) => {
  const ConnectedIndividual = sequelize.define(
    "ConnectedIndividual",
    {
      IndividualId: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      BusinessId: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      ApplicationId: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      point: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      concurrence: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      showOn: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  ConnectedIndividual.associate = (db) => {};
  return ConnectedIndividual;
};
