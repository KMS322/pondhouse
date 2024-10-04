module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      admin_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      admin_pw: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {};
  return User;
};
