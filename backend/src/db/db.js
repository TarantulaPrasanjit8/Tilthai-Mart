
//Database connection using Sequelize
const {Sequelize} = require('sequelize');

//Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, //Disable for production
  // 1. Force the database session to route here
  searchPath: 'testdb', 
  dialectOptions: {
    // 2. Tells the postgres driver to prepend the search path
    prependSearchPath: true,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false // Prevents connection errors with self-signed certificates
    
  
  }
});

const create_order = require('../models/oder.model')(sequelize);
const create_order_items = require('../models/oderItems.model')(sequelize);
const productItems = require('../models/product_items.model')(sequelize);
const custUser = require('../models/user.model')(sequelize);

// initializing relationship between models
custUser.hasMany(create_order, { 
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
create_order.belongsTo(custUser, { foreignKey: 'user_id', as: 'users'});

create_order.hasMany(create_order_items, { 
  foreignKey: 'order_id', as: 'items',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
create_order_items.belongsTo(create_order, { foreignKey: 'order_id' });

productItems.hasMany(create_order_items, { 
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE', 
});
create_order_items.belongsTo(productItems, { foreignKey: 'product_id'}); 


const connectDB = async () =>{
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

  }catch (err){
    console.log('Unable to connect to the Database:', err);
  }
}

module.exports = {sequelize, connectDB, create_order, create_order_items, productItems, custUser};