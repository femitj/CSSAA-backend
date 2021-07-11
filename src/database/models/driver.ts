'use strict';
module.exports = (sequelize: any, DataTypes: any) => {
  const User = sequelize.define(
    'Driver',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      license_number: DataTypes.STRING,
      car_number: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: 'Drivers',
    }
  );

  User.associate = function (models: any) {
    // associations can be defined here
  };

  return User;
};
