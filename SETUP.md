# Real Estate Project - Complete Setup Guide

This guide will help you set up and run the complete Real Estate project with both frontend and backend.

## Project Structure

```
Real Estate S/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── services/           # API client and services
│   └── ...
├── backend/                # Backend Node.js/Express API
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── utils/             # Utility functions
│   └── uploads/           # File uploads directory
├── package.json           # Frontend dependencies
└── backend/package.json   # Backend dependencies
```

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## Step 1: Backend Setup

### 1.1 Install Backend Dependencies

```bash
cd backend
npm install
```

### 1.2 Configure Environment Variables

The backend uses a `config.env` file for configuration. Make sure it contains:

```env
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

### 1.3 Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `config.env`

### 1.4 Seed the Database

```bash
npm run seed
```

This will create sample users and properties:
- **Buyer**: john@example.com / password123
- **Seller**: jane@example.com / password123
- **Admin**: admin@example.com / admin123

### 1.5 Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will be running at `http://localhost:5000`

## Step 2: Frontend Setup

### 2.1 Install Frontend Dependencies

```bash
# From the root directory
npm install
```

### 2.2 Start the Frontend Development Server

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`

## Step 3: Verify Installation

### 3.1 Backend Health Check

Visit `http://localhost:5000/api/health` in your browser or use curl:

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "success",
  "message": "Real Estate API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3.2 Frontend Application

Open `http://localhost:5173` in your browser to see the Real Estate application.

## API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties` - Get all properties with filters
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property (Seller/Admin)
- `PUT /api/properties/:id` - Update property (Owner/Admin)
- `DELETE /api/properties/:id` - Delete property (Owner/Admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/properties` - Get user's properties
- `GET /api/users/favorites` - Get user's favorites

### Favorites
- `POST /api/favorites/:id` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### Contact
- `POST /api/contact` - Submit contact form

## Testing the Application

### 1. User Registration/Login

1. Go to the signup page
2. Register as a buyer or seller
3. Login with your credentials

### 2. Property Browsing

1. Browse properties on the home page
2. Use filters to search for specific properties
3. View property details

### 3. Seller Features

1. Login as a seller (jane@example.com / password123)
2. Add new properties
3. Manage your property listings

### 4. Buyer Features

1. Login as a buyer (john@example.com / password123)
2. Add properties to favorites
3. Contact property owners

## Development Workflow

### Backend Development

```bash
cd backend
npm run dev
```

The server will restart automatically when you make changes.

### Frontend Development

```bash
npm run dev
```

The development server will hot-reload when you make changes.

### Database Management

```bash
# Seed fresh data
npm run seed

# Reset database (delete all data)
# You can manually delete collections in MongoDB or use the seeder
```

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/real-estate-db |
| `JWT_SECRET` | JWT secret key | your-super-secret-jwt-key |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:5173 |

### Frontend

The frontend API client is configured to connect to `http://localhost:5000/api` by default.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `config.env`
   - Verify network connectivity

2. **Port Already in Use**
   - Change the port in `config.env`
   - Kill the process using the port

3. **CORS Errors**
   - Ensure the frontend URL is correct in `CORS_ORIGIN`
   - Check that both servers are running

4. **File Upload Issues**
   - Ensure the `uploads/` directory exists
   - Check file size limits
   - Verify file types

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in the backend.

## Production Deployment

### Backend Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB Atlas
4. Set up proper CORS origins
5. Use environment variables for sensitive data

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Update the API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check the console for error messages
4. Verify all prerequisites are installed

## License

This project is licensed under the MIT License. 