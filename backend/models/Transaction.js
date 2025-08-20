const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  buyerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  sellerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(
      'pending', 'payment_processing', 'payment_confirmed', 
      'item_shipped', 'item_delivered', 'completed', 
      'cancelled', 'refunded', 'disputed'
    ),
    defaultValue: 'pending'
  },
  stripePaymentIntentId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  escrowReleaseDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  shippingInfo: {
    type: DataTypes.JSON,
    allowNull: true
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  shippingCarrier: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fees: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      platformFee: 0,
      paymentProcessingFee: 0,
      shippingFee: 0
    }
  }
}, {
  tableName: 'transactions',
  timestamps: true
});

module.exports = Transaction;