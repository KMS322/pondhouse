module.exports = (sequelize, DataTypes) => {
  const UserIndividual = sequelize.define(
    "UserIndividual",
    {
      user_member_name: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_member_num: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_member_jibunAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      user_member_detailAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      user_member_roadAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      user_member_tel: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_member_email: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_member_career: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_member_workType: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  UserIndividual.associate = (db) => {
    db.UserIndividual.belongsTo(db.User, { foreignKey: "IndividualId" });
  };
  return UserIndividual;
};
