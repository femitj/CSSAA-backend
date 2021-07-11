'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() =>
        queryInterface.createTable('Users', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          phone_number: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          license_number: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          car_number: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          role: {
            allowNull: true,
            type: Sequelize.STRING,
            allowNull: false,
          },
          latitude: {
            type: Sequelize.DECIMAL,
            allowNull: true,
          },
          longitude: {
            type: Sequelize.DECIMAL,
            allowNull: true,
          },
          status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'inactive',
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
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
