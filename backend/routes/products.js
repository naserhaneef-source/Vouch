const express = require('express');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Product, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, brand, minPrice, maxPrice } = req.query;
    
    const where = { status: 'active' };
    
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (minPrice) where.price = { ...where.price, [Op.gte]: minPrice };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: maxPrice };
    
    const products = await Product.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'seller',
        attributes: ['id', 'firstName', 'lastName', 'isVerified']
      }],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      products: products.rows,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      totalItems: products.count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'seller',
        attributes: ['id', 'firstName', 'lastName', 'isVerified']
      }]
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create product (authenticated)
router.post('/', auth, [
  body('title').trim().isLength({ min: 3 }),
  body('description').trim().isLength({ min: 10 }),
  body('brand').trim().isLength({ min: 1 }),
  body('category').trim().isLength({ min: 1 }),
  body('condition').isIn(['new', 'like-new', 'good', 'fair']),
  body('price').isFloat({ min: 0.01 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productData = {
      ...req.body,
      sellerId: req.user.id
    };

    const product = await Product.create(productData);
    
    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product (authenticated, owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.sellerId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await product.update(req.body);
    
    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete product (authenticated, owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.sellerId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await product.update({ status: 'removed' });
    
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's products (authenticated)
router.get('/user/my-products', auth, async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { sellerId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;