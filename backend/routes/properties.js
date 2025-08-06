import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Property from '../models/Property.js';
import User from '../models/User.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { uploadMultiple, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// @desc    Get all properties with filtering and pagination
// @route   GET /api/properties
// @access  Public
router.get('/', optionalAuth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
  query('propertyType').optional().isIn(['apartment', 'house', 'villa', 'commercial', 'land', 'office']),
  query('priceType').optional().isIn(['sale', 'rent']),
  query('city').optional().trim(),
  query('state').optional().trim(),
  query('bedrooms').optional().isInt({ min: 0 }).withMessage('Bedrooms must be a non-negative integer'),
  query('bathrooms').optional().isInt({ min: 0 }).withMessage('Bathrooms must be a non-negative integer'),
  query('readyToMove').optional().isBoolean().withMessage('Ready to move must be a boolean'),
  query('sortBy').optional().isIn(['price', 'date', 'rating', 'views']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      propertyType,
      priceType,
      city,
      state,
      bedrooms,
      bathrooms,
      readyToMove,
      sortBy = 'date',
      sortOrder = 'desc',
      search
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (propertyType) filter.propertyType = propertyType;
    if (priceType) filter.priceType = priceType;
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (bedrooms !== undefined) filter.bedrooms = parseInt(bedrooms);
    if (bathrooms !== undefined) filter.bathrooms = parseInt(bathrooms);
    if (readyToMove !== undefined) filter.readyToMove = readyToMove === 'true';

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const properties = await Property.find(filter)
      .populate('owner', 'name email phone')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Property.countDocuments(filter);

    // Add favorite status for authenticated users
    if (req.user) {
      properties.forEach(property => {
        property.isFavorite = req.user.favorites.includes(property._id);
      });
    }

    res.json({
      success: true,
      data: properties,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email phone')
      .populate('reviews.user', 'name');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Increment views
    property.views += 1;
    await property.save();

    // Add favorite status for authenticated users
    if (req.user) {
      property.isFavorite = req.user.favorites.includes(property._id);
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Sellers only)
router.post('/', protect, authorize('seller', 'admin'), uploadMultiple, handleUploadError, [
  body('name').trim().isLength({ min: 5, max: 100 }).withMessage('Property name must be between 5 and 100 characters'),
  body('description').trim().isLength({ min: 20, max: 1000 }).withMessage('Description must be between 20 and 1000 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('priceType').isIn(['sale', 'rent']).withMessage('Price type must be sale or rent'),
  body('propertyType').isIn(['apartment', 'house', 'villa', 'commercial', 'land', 'office']).withMessage('Invalid property type'),
  body('bedrooms').isInt({ min: 0 }).withMessage('Bedrooms must be a non-negative integer'),
  body('bathrooms').isInt({ min: 0 }).withMessage('Bathrooms must be a non-negative integer'),
  body('area').isFloat({ min: 0 }).withMessage('Area must be a positive number'),
  body('areaUnit').isIn(['sqft', 'sqm', 'acres', 'hectares']).withMessage('Invalid area unit'),
  body('location.address').trim().notEmpty().withMessage('Address is required'),
  body('location.city').trim().notEmpty().withMessage('City is required'),
  body('location.state').trim().notEmpty().withMessage('State is required'),
  body('location.pincode').matches(/^[0-9]{6}$/).withMessage('Pincode must be 6 digits'),
  body('amenities').isArray().withMessage('Amenities must be an array'),
  body('readyToMove').isBoolean().withMessage('Ready to move must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Handle uploaded images
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    const propertyData = {
      ...req.body,
      owner: req.user.id,
      images
    };

    const property = await Property.create(propertyData);

    // Add property to user's properties
    await User.findByIdAndUpdate(req.user.id, {
      $push: { properties: property._id }
    });

    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Owner or Admin)
router.put('/:id', protect, uploadMultiple, handleUploadError, [
  body('name').optional().trim().isLength({ min: 5, max: 100 }).withMessage('Property name must be between 5 and 100 characters'),
  body('description').optional().trim().isLength({ min: 20, max: 1000 }).withMessage('Description must be between 20 and 1000 characters'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('priceType').optional().isIn(['sale', 'rent']).withMessage('Price type must be sale or rent'),
  body('propertyType').optional().isIn(['apartment', 'house', 'villa', 'commercial', 'land', 'office']).withMessage('Invalid property type'),
  body('bedrooms').optional().isInt({ min: 0 }).withMessage('Bedrooms must be a non-negative integer'),
  body('bathrooms').optional().isInt({ min: 0 }).withMessage('Bathrooms must be a non-negative integer'),
  body('area').optional().isFloat({ min: 0 }).withMessage('Area must be a positive number'),
  body('areaUnit').optional().isIn(['sqft', 'sqm', 'acres', 'hectares']).withMessage('Invalid area unit'),
  body('location.address').optional().trim().notEmpty().withMessage('Address is required'),
  body('location.city').optional().trim().notEmpty().withMessage('City is required'),
  body('location.state').optional().trim().notEmpty().withMessage('State is required'),
  body('location.pincode').optional().matches(/^[0-9]{6}$/).withMessage('Pincode must be 6 digits'),
  body('amenities').optional().isArray().withMessage('Amenities must be an array'),
  body('readyToMove').optional().isBoolean().withMessage('Ready to move must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      req.body.images = [...property.images, ...newImages];
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      data: updatedProperty
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Owner or Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    // Remove property from user's properties
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { properties: req.params.id }
    });

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Add review to property
// @route   POST /api/properties/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user already reviewed
    const existingReview = property.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this property'
      });
    }

    const review = {
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment || ''
    };

    property.reviews.push(review);

    // Update average rating
    const totalRating = property.reviews.reduce((sum, review) => sum + review.rating, 0);
    property.rating = totalRating / property.reviews.length;

    await property.save();

    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
router.get('/featured', optionalAuth, async (req, res) => {
  try {
    const properties = await Property.find({ 
      isFeatured: true, 
      isActive: true 
    })
    .populate('owner', 'name')
    .limit(6)
    .sort({ rating: -1, views: -1 });

    // Add favorite status for authenticated users
    if (req.user) {
      properties.forEach(property => {
        property.isFavorite = req.user.favorites.includes(property._id);
      });
    }

    res.json({
      success: true,
      data: properties
    });
  } catch (error) {
    console.error('Get featured properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router; 