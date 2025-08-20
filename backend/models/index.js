const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Transaction = require('./Transaction');

// Define associations
User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

User.hasMany(Transaction, { foreignKey: 'buyerId', as: 'purchases' });
User.hasMany(Transaction, { foreignKey: 'sellerId', as: 'sales' });

Transaction.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });
Transaction.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
Transaction.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Product.hasMany(Transaction, { foreignKey: 'productId', as: 'transactions' });

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.log('Running in development mode without database...');
  }
};

module.exports = {
  sequelize,
  User,
  Product,
  Transaction,
  initDatabase
};