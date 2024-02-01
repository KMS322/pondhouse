module.exports = (sequelize, DataTypes) => {
  const BusinessRecruitment = sequelize.define(
    "BusinessRecruitment",
    {
      business_recruitment_name: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_tel: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      business_recruitment_email: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      business_recruitment_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      business_recruitment_insurance1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_insurance2: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_insurance3: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_insurance4: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_insurance5: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_welfare1: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      business_recruitment_welfare2: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      business_recruitment_welfare3: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      business_recruitment_welfare4: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      business_recruitment_welfare5: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      business_recruitment_welfare6: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      business_recruitment_welfare7: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      business_recruitment_welfare8: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      business_recruitment_welfare9: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      business_recruitment_welfare10: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      business_recruitment_meal: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_handicapped1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_handicapped2: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_handicapped3: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_handicapped4: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_handicapped5: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_handicapped6: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      business_recruitment_program1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_program2: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_program3: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_program4: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_program5: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_program6: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      business_recruitment_accountingProgram: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_accountingProgramLevel: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_abilityDrive1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_abilityDrive2: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_major1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_recruitment_major2: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collaste: "utf8_general_ci",
    }
  );
  BusinessRecruitment.associate = (db) => {
    db.BusinessRecruitment.belongsTo(db.User, { foreignKey: "BusinessId" });
    // db.BusinessApplication.belongsTo(db.UserBusiness, {
    //   foreignKey: "BusinessId",
    // });
  };
  return BusinessRecruitment;
};
