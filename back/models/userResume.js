module.exports = (sequelize, DataTypes) => {
  const UserResume = sequelize.define(
    "UserResume",
    {
      user_resume_title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      user_resume_school: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_resume_schoolMajor: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_resume_schoolPeriod1Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_schoolPeriod1Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_schoolPeriod2Year: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_schoolPeriod2Month: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_schoolFinal: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeCompany: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_resume_hopeRegion1: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_resume_hopeRegion2: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      user_resume_hopeRegion: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopePayType1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopePay: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopePayType2: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeWork1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeWork2: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeWork3: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeWork4: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeStartYear: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeStartMonth: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeStartDay: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeWorkTime1Hour: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeWorkTime1Minute: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeWorkTime2Hour: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_resume_hopeWorkTime2Minute: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  UserResume.associate = (db) => {
    db.UserResume.belongsTo(db.User, { foreignKey: "IndividualId" });
  };
  return UserResume;
};
