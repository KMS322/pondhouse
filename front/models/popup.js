module.exports = (sequelize, DataTypes) => {
  const Popup = sequelize.define(
    "Popup",
    {
      img_src: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      active: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defalutValue: "off",
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Popup.associate = (db) => {};
  return Popup;
};
