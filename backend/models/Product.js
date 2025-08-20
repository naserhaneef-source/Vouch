const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  condition: {
    type: DataTypes.ENUM('new', 'like-new', 'good', 'fair'),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: []
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true
  },
  material: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  authenticityStatus: {
    type: DataTypes.ENUM('pending', 'authenticated', 'rejected'),
    defaultValue: 'pending'
  },
  authenticityProvider: {
    type: DataTypes.STRING,
    allowNull: true
  },
  authenticityReport: {
    type: DataTypes.JSON,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'sold', 'removed'),
    defaultValue: 'draft'
  },
  sellerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;