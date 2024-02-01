module.exports = (sequelize, DataTypes) => {
  const UserCareer = sequelize.define(
    "UserCareer",
    {
      user_career_company1: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      user_career_position1: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_companyState1: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_program1: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_period11Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_period11Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_period12Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_period12Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_company2: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      user_career_position2: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_companyState2: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_program2: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_period21Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_period21Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_period22Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_period22Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_company3: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      user_career_position3: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_companyState3: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_program3: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_period31Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_period31Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_period32Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_period32Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_license1: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_career_license1Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_license1Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_license1Day: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_license1Organization: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_license2: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_career_license2Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_license2Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_license2Day: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_license2Organization: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_license3: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_career_license3Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_license3Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_license3Day: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_license3Organization: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_trainingName1: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_trainingPeriod11Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_trainingPeriod11Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_trainingPeriod12Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_trainingPeriod12Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_trainingDetail1: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      user_career_trainingOrganization: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_career_changeYear: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_changeMonth: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_changeReason: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_knowCount: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_knowTax: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_abilityProcess1: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_career_abilityProcess2: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_career_abilityProcess3: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_career_abilityProcess4: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_career_abilityProcess5: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_career_abilityProcess6: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      user_career_abilityDrive1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_career_abilityDrive2: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  UserCareer.associate = (db) => {
    db.UserCareer.belongsTo(db.User, { foreignKey: "IndividualId" });
  };
  return UserCareer;
};
