import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Property from '../models/Property.js';

// Load environment variables
dotenv.config({ path: './config.env' });

// Sample users data
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '9876543210',
    role: 'buyer',
    isVerified: true
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '9876543211',
    role: 'seller',
    isVerified: true
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '9876543212',
    role: 'admin',
    isVerified: true
  }
];

// Sample properties data
const properties = [
  {
    name: 'Modern 3 BHK Apartment',
    description: 'Beautiful modern apartment with all amenities. Located in a prime area with excellent connectivity.',
    price: 8500000,
    priceType: 'sale',
    propertyType: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    areaUnit: 'sqft',
    location: {
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    amenities: ['Swimming Pool', 'Gym', 'Park', '24/7 Security', 'Parking'],
    images: ['/uploads/sample1.jpg', '/uploads/sample2.jpg'],
    readyToMove: true,
    isFeatured: true,
    tags: ['modern', 'luxury', 'prime-location']
  },
  {
    name: 'Spacious 2 BHK Villa',
    description: 'Elegant villa with garden and modern amenities. Perfect for families looking for space and comfort.',
    price: 15000000,
    priceType: 'sale',
    propertyType: 'villa',
    bedrooms: 2,
    bathrooms: 3,
    area: 2000,
    areaUnit: 'sqft',
    location: {
      address: '456 Garden Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    },
    amenities: ['Private Garden', 'Swimming Pool', 'Gym', 'Security', 'Parking'],
    images: ['/uploads/sample3.jpg', '/uploads/sample4.jpg'],
    readyToMove: false,
    possessionDate: new Date('2024-12-01'),
    isFeatured: true,
    tags: ['villa', 'garden', 'spacious']
  },
  {
    name: 'Commercial Office Space',
    description: 'Prime commercial office space in business district. Ideal for startups and established companies.',
    price: 25000,
    priceType: 'rent',
    propertyType: 'commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 1500,
    areaUnit: 'sqft',
    location: {
      address: '789 Business Park',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001'
    },
    amenities: ['Reception', 'Conference Room', 'Parking', 'Security', 'Cafeteria'],
    images: ['/uploads/sample5.jpg', '/uploads/sample6.jpg'],
    readyToMove: true,
    isFeatured: false,
    tags: ['commercial', 'office', 'business']
  },
  {
    name: 'Luxury 4 BHK Penthouse',
    description: 'Exclusive penthouse with panoramic city views. Top floor luxury living with premium amenities.',
    price: 25000000,
    priceType: 'sale',
    propertyType: 'apartment',
    bedrooms: 4,
    bathrooms: 4,
    area: 3000,
    areaUnit: 'sqft',
    location: {
      address: '101 Sky Tower',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002'
    },
    amenities: ['Panoramic View', 'Private Terrace', 'Jacuzzi', 'Concierge', 'Private Theater'],
    images: ['/uploads/sample7.jpg', '/uploads/sample8.jpg'],
    readyToMove: true,
    isFeatured: true,
    tags: ['luxury', 'penthouse', 'panoramic-view']
  },
  {
    name: 'Cozy 1 BHK for Rent',
    description: 'Perfect starter home for young professionals. Well-maintained apartment in a friendly neighborhood.',
    price: 15000,
    priceType: 'rent',
    propertyType: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    areaUnit: 'sqft',
    location: {
      address: '202 Comfort Lane',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001'
    },
    amenities: ['Parking', 'Security', 'Water Supply', 'Power Backup'],
    images: ['/uploads/sample9.jpg', '/uploads/sample10.jpg'],
    readyToMove: true,
    isFeatured: false,
    tags: ['cozy', 'starter-home', 'affordable']
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Seed users
const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create users with hashed passwords
    const createdUsers = [];
    for (const userData of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = await User.create({
        ...userData,
        password: hashedPassword
      });
      createdUsers.push(user);
      console.log(`Created user: ${user.name}`);
    }

    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

// Seed properties
const seedProperties = async (users) => {
  try {
    // Clear existing properties
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    // Get seller user
    const seller = users.find(user => user.role === 'seller');
    if (!seller) {
      throw new Error('No seller user found');
    }

    // Create properties
    for (let i = 0; i < properties.length; i++) {
      const propertyData = {
        ...properties[i],
        owner: seller._id
      };

      const property = await Property.create(propertyData);
      console.log(`Created property: ${property.name}`);

      // Add property to seller's properties
      await User.findByIdAndUpdate(seller._id, {
        $push: { properties: property._id }
      });
    }

    console.log('Properties seeded successfully');
  } catch (error) {
    console.error('Error seeding properties:', error);
    throw error;
  }
};

// Main seeder function
const seedData = async () => {
  try {
    console.log('Starting data seeding...');
    
    // Connect to database
    await connectDB();
    
    // Seed users
    const createdUsers = await seedUsers();
    
    // Seed properties
    await seedProperties(createdUsers);
    
    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedData();
}

export default seedData; 