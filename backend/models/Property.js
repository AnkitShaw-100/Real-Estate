import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true,
    maxlength: [100, 'Property name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Property price is required'],
    min: [0, 'Price cannot be negative']
  },
  priceType: {
    type: String,
    enum: ['sale', 'rent'],
    default: 'sale'
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'villa', 'commercial', 'land', 'office'],
    required: [true, 'Property type is required']
  },
  bedrooms: {
    type: Number,
    min: [0, 'Bedrooms cannot be negative'],
    default: 0
  },
  bathrooms: {
    type: Number,
    min: [0, 'Bathrooms cannot be negative'],
    default: 0
  },
  area: {
    type: Number,
    required: [true, 'Property area is required'],
    min: [0, 'Area cannot be negative']
  },
  areaUnit: {
    type: String,
    enum: ['sqft', 'sqm', 'acres', 'hectares'],
    default: 'sqft'
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  amenities: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Property owner is required']
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented', 'pending'],
    default: 'available'
  },
  readyToMove: {
    type: Boolean,
    default: false
  },
  possessionDate: {
    type: Date
  },
  listedDate: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  favorites: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Review comment cannot be more than 500 characters']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  additionalDetails: {
    parking: {
      type: String,
      enum: ['available', 'not-available', 'covered', 'uncovered']
    },
    furnishing: {
      type: String,
      enum: ['furnished', 'semi-furnished', 'unfurnished']
    },
    floor: Number,
    totalFloors: Number,
    age: Number,
    facing: String,
    waterSupply: {
      type: String,
      enum: ['24x7', 'morning', 'evening', 'not-available']
    },
    powerBackup: {
      type: String,
      enum: ['available', 'not-available']
    }
  }
}, {
  timestamps: true
});

// Index for search functionality
propertySchema.index({
  name: 'text',
  description: 'text',
  'location.city': 'text',
  'location.state': 'text',
  tags: 'text'
});

// Virtual for average rating
propertySchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / this.reviews.length).toFixed(1);
});

// Virtual for total reviews count
propertySchema.virtual('totalReviews').get(function() {
  return this.reviews.length;
});

// Ensure virtual fields are serialized
propertySchema.set('toJSON', { virtuals: true });
propertySchema.set('toObject', { virtuals: true });

export default mongoose.model('Property', propertySchema); 