'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() =>
        queryInterface.createTable('Drivers', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          name: {
            type: Sequelize.STRING,
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
          },
          phone_number: {
            type: Sequelize.STRING,
            unique: true,
          },
          license_number: {
            type: Sequelize.STRING,
            unique: true,
          },
          car_number: {
            type: Sequelize.STRING,
            unique: true,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now'),
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now'),
          },
        })
      ),
  down: (queryInterface) => queryInterface.dropTable('Drivers'),
};
