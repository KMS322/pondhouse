module.exports = (sequelize, DataTypes) => {
  const VideoList = sequelize.define(
    "VideoList",
    {
      file_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      file_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  VideoList.associate = (db) => {};
  return VideoList;
};
