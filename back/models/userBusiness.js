module.exports = (sequelize, DataTypes) => {
  const UserBusiness = sequelize.define(
    "UserBusiness",
    {
      business_member_companyName: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      business_member_companyNumber: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      business_member_name: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_member_companyState: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_member_employeeNumber: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_member_officeState: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_member_jibunAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      business_member_detailAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      business_member_roadAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      business_member_tel: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      business_member_email: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      business_member_workType: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_member_pay: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  UserBusiness.associate = (db) => {
    db.UserBusiness.belongsTo(db.User, { foreignKey: "BusinessId" });
    db.UserBusiness.hasMany(db.BusinessApplication, {
      foreignKey: "BusinessId",
    });
    db.UserBusiness.hasOne(db.BusinessRecruitment, {
      foreignKey: "BusinessId",
    });
  };
  return UserBusiness;
};
