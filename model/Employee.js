const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://server:abc@localhost:3000/employees');

//http://docs.sequelizejs.com/en/latest/docs/models-definition/#validations
//http://docs.sequelizejs.com/en/latest/docs/models-definition/
const Employee = sequelize.define('Employee', {
  _id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /[0-9]{3}-[0-9]{3}-[0-9]{4}/
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    position: {
      type: Sequelize.ENUM('manager', 'accountant', 'engineer', 'receptionist'),
      allowNull: false
    }
  },
  {
  freezeTableName: true // Model tableName will be the same as the model name
  }

});

module.exports = Employee;
