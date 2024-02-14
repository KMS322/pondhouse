module.exports = (sequelize, DataTypes) => {
  const Kakao = sequelize.define(
    "Kakao",
    {
      restApiKey: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "b5f7d20ab71488c958847f02fe66c821",
      },
      accessToken: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Kakao.associate = (db) => {};
  return Kakao;
};
