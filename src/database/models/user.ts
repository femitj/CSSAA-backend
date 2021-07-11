'use strict';
module.exports = (sequelize: any, DataTypes: any) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      license_number: DataTypes.STRING,
      car_number: DataTypes.STRING,
      role: DataTypes.STRING,
      status: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: 'Users',
      underscored: true,
    }
  );

  User.associate = function (models: any) {
    // associations can be defined here
  };

  return User;
};
