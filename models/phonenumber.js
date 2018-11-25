const { isBoolean, toBoolean } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  const PhoneNumber = sequelize.define(
    'PhoneNumber',
    {
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
          len: [10, 10],
        },
      },
      assigned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          isBoolean,
        },
        get() {
          const assigned = this.getDataValue('assigned');
          return toBoolean(assigned);
        },
      },
    },
    {},
  );
  return PhoneNumber;
};
