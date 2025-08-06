import express from 'express';
import User from '../models/User.js';
import Property from '../models/Property.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get user's favorites
// @route   GET /api/favorites
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'favorites',
      populate: {
        path: 'owner',
        select: 'name email phone'
      }
    });

    res.json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Add property to favorites
// @route   POST /api/favorites/:propertyId
// @access  Private
router.post('/:propertyId', protect, async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    const user = await User.findById(req.user.id);
    
    // Check if already in favorites
    if (user.favorites.includes(req.params.propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Property already in favorites'
      });
    }

    // Add to favorites
    user.favorites.push(req.params.propertyId);
    await user.save();

    // Update property favorites count
    property.favorites += 1;
    await property.save();

    res.json({
      success: true,
      message: 'Property added to favorites'
    });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Remove property from favorites
// @route   DELETE /api/favorites/:propertyId
// @access  Private
router.delete('/:propertyId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Check if property is in favorites
    if (!user.favorites.includes(req.params.propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Property not in favorites'
      });
    }

    // Remove from favorites
    user.favorites = user.favorites.filter(
      id => id.toString() !== req.params.propertyId
    );
    await user.save();

    // Update property favorites count
    const property = await Property.findById(req.params.propertyId);
    if (property) {
      property.favorites = Math.max(0, property.favorites - 1);
      await property.save();
    }

    res.json({
      success: true,
      message: 'Property removed from favorites'
    });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Check if property is in favorites
// @route   GET /api/favorites/:propertyId/check
// @access  Private
router.get('/:propertyId/check', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const isFavorite = user.favorites.includes(req.params.propertyId);

    res.json({
      success: true,
      data: { isFavorite }
    });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Clear all favorites
// @route   DELETE /api/favorites
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get all favorite property IDs
    const favoriteIds = user.favorites;
    
    // Clear favorites
    user.favorites = [];
    await user.save();

    // Update property favorites counts
    for (const propertyId of favoriteIds) {
      const property = await Property.findById(propertyId);
      if (property) {
        property.favorites = Math.max(0, property.favorites - 1);
        await property.save();
      }
    }

    res.json({
      success: true,
      message: 'All favorites cleared'
    });
  } catch (error) {
    console.error('Clear favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router; 