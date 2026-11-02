const DataTypes = require('sequelize');
const {sequelize} = require('../db/db');
const bcrypt = require('bcrypt');

const adminuser = sequelize.define('adminuser', {
    // 1st Define the model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    created_at: {
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        field: 'created_at',
        allowNull: true,
    }
}, 


//2nd argument to define the model options
{
  // 1. Force the correct schema and table name
  schema: 'testdb', 
  tableName: 'adminusers',
  freezeTableName: true,
  // 2. Fix the timestamp issue
  // This forces Sequelize to use 'created_at' and 'updated_at' 
  // instead of creating duplicate camelCase 'createdAt' columns
  underscored: true, 
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
}
);

module.exports = adminuser;
