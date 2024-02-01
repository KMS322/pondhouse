module.exports = (sequelize, DataTypes) => {
  const BusinessApplication = sequelize.define(
    "BusinessApplication",
    {
      business_application_name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      business_application_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      business_application_startNow: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      business_application_number: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_startYear: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_startMonth: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_startDay: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_expectPeriod: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workContent1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workContent2: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workContent3: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workContent4: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workContent5: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workContent6: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workContent7: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_program: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_program1: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      business_application_career: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_careerMin: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_careerMax: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_schoolFinal: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_schoolLisence: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      business_application_schoolLisence1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_payType: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_payMin: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_payMax: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workTime1Hour: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workTime1Minute: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workTime2Hour: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workTime2Minute: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workTimeDay: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workTimeHour: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_breakTime1Hour: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_breakTime1Minute: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_breakTime2Hour: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_breakTime2Minute: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_workPlace: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      business_application_severancePay: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_employmentType: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      business_application_employmentTypeMonth: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_rank1: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_rank2: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_rank3: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      business_application_rank4: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      applyDay: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      individualCnt: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: "5",
      },
      progressStep: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: "목록신청전",
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  BusinessApplication.associate = (db) => {
    db.BusinessApplication.belongsTo(db.User, { foreignKey: "BusinessId" });
    // db.BusinessApplication.belongsTo(db.UserBusiness, {
    //   foreignKey: "BusinessId",
    // });
  };
  return BusinessApplication;
};
