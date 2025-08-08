import express from 'express';
import { Favorite } from '../models/Favorite.js';

const router = express.Router();

// GET /api/favorites/:userId - Get all favorites for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.findByUserId(userId);

    res.json({
      success: true,
      data: favorites,
      count: favorites.length
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch favorites',
      message: error.message
    });
  }
});

// POST /api/favorites - Add product to favorites
router.post('/', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId and productId'
      });
    }

    const favorite = await Favorite.create(userId, productId);
    
    res.status(201).json({
      success: true,
      data: favorite,
      message: 'Product added to favorites successfully'
    });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    
    if (error.message.includes('already in favorites')) {
      return res.status(409).json({
        success: false,
        error: 'Product is already in favorites'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to add to favorites',
      message: error.message
    });
  }
});

// DELETE /api/favorites/:userId/:productId - Remove product from favorites
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    
    await Favorite.delete(userId, productId);
    
    res.json({
      success: true,
      message: 'Product removed from favorites successfully'
    });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to remove from favorites',
      message: error.message
    });
  }
});

// GET /api/favorites/:userId/:productId/check - Check if product is favorited
router.get('/:userId/:productId/check', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const isFavorite = await Favorite.isFavorite(userId, productId);
    
    res.json({
      success: true,
      data: { isFavorite }
    });
  } catch (error) {
    console.error('Error checking favorite status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check favorite status',
      message: error.message
    });
  }
});

export default router;