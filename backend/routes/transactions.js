const express = require('express');
const { Transaction, Product, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Create transaction (purchase)
router.post('/', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    
    const product = await Product.findByPk(productId, {
      include: [{ model: User, as: 'seller' }]
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.status !== 'active') {
      return res.status(400).json({ error: 'Product not available for purchase' });
    }
    
    if (product.sellerId === req.user.id) {
      return res.status(400).json({ error: 'Cannot purchase your own product' });
    }

    const transaction = await Transaction.create({
      productId,
      buyerId: req.user.id,
      sellerId: product.sellerId,
      amount: product.price,
      status: 'pending'
    });
    
    // Update product status
    await product.update({ status: 'sold' });
    
    res.status(201).json({
      message: 'Transaction created successfully',
      transaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user transactions
router.get('/my-transactions', auth, async (req, res) => {
  try {
    const purchases = await Transaction.findAll({
      where: { buyerId: req.user.id },
      include: [
        { model: Product, as: 'product' },
        { model: User, as: 'seller', attributes: ['id', 'firstName', 'lastName'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    const sales = await Transaction.findAll({
      where: { sellerId: req.user.id },
      include: [
        { model: Product, as: 'product' },
        { model: User, as: 'buyer', attributes: ['id', 'firstName', 'lastName'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ purchases, sales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single transaction
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [
        { model: Product, as: 'product' },
        { model: User, as: 'buyer', attributes: ['id', 'firstName', 'lastName'] },
        { model: User, as: 'seller', attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    // Check if user is involved in transaction
    if (transaction.buyerId !== req.user.id && transaction.sellerId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    res.json({ transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update transaction status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findByPk(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    // Check if user is involved in transaction
    if (transaction.buyerId !== req.user.id && transaction.sellerId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await transaction.update({ status });
    
    res.json({
      message: 'Transaction status updated',
      transaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;