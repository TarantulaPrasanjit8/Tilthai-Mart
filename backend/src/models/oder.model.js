const DataTypes = require('sequelize');

/**
 * oder model
 */

module.exports =(sequelize) => { 
    const create_order = sequelize.define('order', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'done'
    },

    placed_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "placed_at"
    },
    accepted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    cancelled_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    delivery_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    payment_method: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'COD'
    },
    updated_at: {
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        allowNull: false,
        field: 'updated_at'
    }, 
    created_at: {
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        allowNull: false,
        field: 'created_at'
    },
    address: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
},
{
    schema: 'testdb',
    tableName: 'order',
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});
return create_order;
}

