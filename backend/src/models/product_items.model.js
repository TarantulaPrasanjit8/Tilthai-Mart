const DataTypes = require('sequelize');


// items module
module.exports = (sequelize)=>{ 
    const productItems = sequelize.define('products', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    marchant_name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    tax: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    discount:{
        type: DataTypes.STRING(5),
        allowNull: true,
        defaultValue: '0'
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    image_url: {
        type: DataTypes.STRING(255)
    },
    updated_at: {
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        field: 'updated_at',
        allowNull: false,
    },
    created_at: {
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        field: 'created_at',
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
},
{
  schema: 'testdb', 
  tableName: 'products',
  freezeTableName: true,
  underscored: true, 
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});
return productItems;

};
