module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userType: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      user_member_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      user_member_pw: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasOne(db.UserIndividual, { foreignKey: "IndividualId" });
    db.User.hasOne(db.UserCareer, { foreignKey: "IndividualId" });
    db.User.hasMany(db.UserResume, { foreignKey: "IndividualId" });
    db.User.hasOne(db.UserBusiness, { foreignKey: "BusinessId" });
    db.User.hasMany(db.BusinessApplication, { foreignKey: "BusinessId" });
    db.User.hasOne(db.BusinessRecruitment, { foreignKey: "BusinessId" });
  };
  return User;
};
