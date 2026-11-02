const DataTypes = require('sequelize');

/**
 * Customer/user model
 * customer registration 
 * and Cutomer Login
 */

module.exports = (sequelize) => { 
    const custUser = sequelize.define('users', {
    //user_id
    id: { 
        type: DataTypes.BIGINT, 
        primaryKey: true, 
        autoIncrement: true 
    },
    full_name: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING(100), 
        allowNull: false, 
        unique: true, 
        validate: { isEmail: true } 
    },
    phone_number: { 
        type: DataTypes.STRING(20), 
        allowNull: false, 
        unique: true 
    },
    password_hash: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    updated_at: {
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        field: 'updated_at',
        allowNull: true
    },
    created_at: {
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        field: 'created_at',
        allowNull: true,
    },
},
// 2nd argument to the model options

{
// 1. Force the correct schema and table name
  schema: 'testdb', 
  tableName: 'users',
  freezeTableName: true,
  underscored: true, 
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

return custUser;
};


