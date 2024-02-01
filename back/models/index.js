const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./user")(sequelize, Sequelize);
db.UserIndividual = require("./userIndividual")(sequelize, Sequelize);
db.UserCareer = require("./userCareer")(sequelize, Sequelize);
db.UserResume = require("./userResume")(sequelize, Sequelize);
db.UserBusiness = require("./userBusiness")(sequelize, Sequelize);
db.BusinessApplication = require("./businessApplication")(sequelize, Sequelize);
db.BusinessRecruitment = require("./businessRecruitment")(sequelize, Sequelize);
db.ConnectedIndividual = require("./connectedIndividual")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
