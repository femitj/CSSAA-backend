"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const configSetup = require("../../config/config");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configSetup[env];
const db = {};

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file: any) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts";
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // @ts-ignore
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  // @ts-ignore
  if (db[modelName].associate) {
    // @ts-ignore
    db[modelName].associate(db);
  }
});
// @ts-ignore
db.sequelize = sequelize;
// @ts-ignore
db.Sequelize = Sequelize;

module.exports = db;
