'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhoneNumber = sequelize.define(
    'PhoneNumber',
    {
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          max: 10,
          min: 10
        }
      },
      assigned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {}
  );
  PhoneNumber.associate = function(models) {
    // associations can be defined here
  };
  return PhoneNumber;
};
