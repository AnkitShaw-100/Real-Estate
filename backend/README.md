# Real Estate Backend API

A comprehensive Node.js/Express backend API for the Real Estate Management System with MongoDB database, JWT authentication, and file upload capabilities.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Property Management**: CRUD operations for property listings with advanced filtering and search
- **User Management**: User registration, profile management, and role-based permissions
- **Favorites System**: Add/remove properties to user favorites
- **Contact Management**: Contact form submissions with admin dashboard
- **File Upload**: Image upload for properties and user profiles
- **Search & Filtering**: Advanced property search with multiple filters
- **Reviews & Ratings**: Property reviews and rating system
- **Admin Dashboard**: Comprehensive admin features for managing users, properties, and contacts

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `config.env` and update the values:
   ```bash
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/real-estate-db

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRE=7d

   # File Upload Configuration
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas (cloud service)

5. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |
| PUT | `/api/auth/change-password` | Change password | Private |
| POST | `/api/auth/forgot-password` | Forgot password | Public |
| PUT | `/api/auth/reset-password/:token` | Reset password | Public |

### Property Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/properties` | Get all properties with filters | Public |
| GET | `/api/properties/:id` | Get single property | Public |
| POST | `/api/properties` | Create new property | Private (Seller/Admin) |
| PUT | `/api/properties/:id` | Update property | Private (Owner/Admin) |
| DELETE | `/api/properties/:id` | Delete property | Private (Owner/Admin) |
| POST | `/api/properties/:id/reviews` | Add review to property | Private |
| GET | `/api/properties/featured` | Get featured properties | Public |

### User Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users/profile` | Get user profile | Private |
| PUT | `/api/users/profile` | Update user profile | Private |
| GET | `/api/users/properties` | Get user's properties | Private |
| GET | `/api/users/favorites` | Get user's favorites | Private |
| POST | `/api/users/favorites/:id` | Add to favorites | Private |
| DELETE | `/api/users/favorites/:id` | Remove from favorites | Private |
| GET | `/api/users/stats` | Get user statistics | Private |
| GET | `/api/users` | Get all users | Private (Admin) |
| GET | `/api/users/:id` | Get user by ID | Private (Admin) |
| PUT | `/api/users/:id` | Update user | Private (Admin) |
| DELETE | `/api/users/:id` | Delete user | Private (Admin) |

### Favorites Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/favorites` | Get user's favorites | Private |
| POST | `/api/favorites/:id` | Add to favorites | Private |
| DELETE | `/api/favorites/:id` | Remove from favorites | Private |
| GET | `/api/favorites/:id/check` | Check if in favorites | Private |
| DELETE | `/api/favorites` | Clear all favorites | Private |

### Contact Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Submit contact form | Public |
| GET | `/api/contact` | Get all contacts | Private (Admin) |
| GET | `/api/contact/:id` | Get single contact | Private (Admin) |
| PUT | `/api/contact/:id` | Update contact | Private (Admin) |
| DELETE | `/api/contact/:id` | Delete contact | Private (Admin) |
| GET | `/api/contact/stats` | Get contact statistics | Private (Admin) |
| PUT | `/api/contact/:id/read` | Mark as read | Private (Admin) |

## Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (buyer/seller/admin),
  phone: String,
  profileImage: String,
  isVerified: Boolean,
  isActive: Boolean,
  favorites: [Property IDs],
  properties: [Property IDs]
}
```

### Property Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  priceType: String (sale/rent),
  propertyType: String,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: { latitude: Number, longitude: Number }
  },
  amenities: [String],
  images: [String],
  owner: ObjectId (User),
  status: String,
  readyToMove: Boolean,
  reviews: [Review Objects],
  rating: Number,
  views: Number,
  favorites: Number
}
```

### Contact Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  propertyId: ObjectId (optional),
  status: String,
  priority: String,
  assignedTo: ObjectId (User),
  response: {
    message: String,
    respondedBy: ObjectId (User),
    respondedAt: Date
  }
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## File Upload

The API supports image uploads for:
- Property images (multiple files)
- User profile images (single file)

Files are stored in the `uploads/` directory and served statically.

## Error Handling

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "errors": [...] // Validation errors
}
```

## Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express-validator for request validation
- **Rate Limiting**: Prevents abuse with request limiting
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers middleware
- **File Upload Security**: File type and size validation

## Development

### Scripts
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
npm test       # Run tests (if configured)
```

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRE`: JWT token expiration time
- `CORS_ORIGIN`: Allowed origin for CORS
- `MAX_FILE_SIZE`: Maximum file upload size
- `RATE_LIMIT_MAX_REQUESTS`: Rate limiting configuration

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB Atlas or production MongoDB
4. Set up proper CORS origins
5. Configure file storage (consider cloud storage)
6. Set up monitoring and logging
7. Use HTTPS in production

## API Testing

You can test the API using tools like:
- Postman
- Insomnia
- curl commands
- Frontend application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details 