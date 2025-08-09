import express from 'express';
import { Favorite } from '../models/Favorite.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.findByUserId();

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

router.post('/', async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields productId'
      });
    }

    const favorite = await Favorite.create(productId);

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

router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    await Favorite.delete(productId);

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

router.get('/:productId/check', async (req, res) => {
  try {
    const { productId } = req.params;
    const isFavorite = await Favorite.isFavorite(productId);

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