import express from 'express';
import { Seller } from '../models/Seller.js';

const router = express.Router();

// GET /api/sellers - Get all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.findAll();
    
    res.json({
      success: true,
      data: sellers,
      count: sellers.length
    });
  } catch (error) {
    console.error('Error fetching sellers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sellers',
      message: error.message
    });
  }
});

// GET /api/sellers/:id - Get seller by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id);
    
    if (!seller) {
      return res.status(404).json({
        success: false,
        error: 'Seller not found'
      });
    }
    
    res.json({
      success: true,
      data: seller
    });
  } catch (error) {
    console.error('Error fetching seller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch seller',
      message: error.message
    });
  }
});

// POST /api/sellers - Create new seller
router.post('/', async (req, res) => {
  try {
    const sellerData = req.body;
    const seller = await Seller.create(sellerData);
    
    res.status(201).json({
      success: true,
      data: seller,
      message: 'Seller created successfully'
    });
  } catch (error) {
    console.error('Error creating seller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create seller',
      message: error.message
    });
  }
});

// PUT /api/sellers/:id - Update seller
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sellerData = req.body;
    
    const seller = await Seller.update(id, sellerData);
    
    res.json({
      success: true,
      data: seller,
      message: 'Seller updated successfully'
    });
  } catch (error) {
    console.error('Error updating seller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update seller',
      message: error.message
    });
  }
});

// DELETE /api/sellers/:id - Delete seller
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Seller.delete(id);
    
    res.json({
      success: true,
      message: 'Seller deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting seller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete seller',
      message: error.message
    });
  }
});

export default router;