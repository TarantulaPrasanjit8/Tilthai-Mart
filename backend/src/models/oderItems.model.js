const DataTypes = require('sequelize');


/**
 * order items model
 */

module.exports = (sequelize)=>{ 
  const create_order_items = sequelize.define('order_items', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    // references order id on order table
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },

    // references product id on products table
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      },
      onUpdate: 'CASCADE'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_at_purchage: {
      type: DataTypes.FLOAT, // Sequelize maps PostgreSQL 'real' to DataTypes.FLOAT
      allowNull: false,
      field: 'price_at_purchage',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    }
},

{
    schema: 'testdb',
    tableName: 'order_items',
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});
return create_order_items

};