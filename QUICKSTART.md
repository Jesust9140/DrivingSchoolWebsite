# 🚗 Quick Start Guide

## Immediate Setup (5 minutes)

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Set Up Environment

- Backend `.env` is already configured for local development
- Frontend `.env` is ready to use
- Default MongoDB: `mongodb://localhost:27017/driving_school`

### 3. Start the Application

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

### 4. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

### 5. Add Sample Data (Optional)

```bash
cd backend
npm run seed
```

## 🔑 Default Admin Credentials

- **Email:** admin@imagedrivingschool.com
- **Password:** admin123

## 📱 Features to Test

1. **Homepage** - Hero section, features, testimonials
2. **Navigation** - Responsive navbar with mobile menu
3. **Booking Form** - Multi-step lesson booking (available after creating lessons)
4. **Authentication** - Register/Login functionality

## 🛠️ Development Tools

- **Hot Reload:** Both frontend and backend support hot reloading
- **API Testing:** Use Postman or the frontend to test API endpoints
- **Database:** MongoDB Compass for database management

## 📋 Next Steps

1. Customize the design and branding
2. Add more pages (About, Lessons, Contact)
3. Implement user dashboard
4. Add admin panel
5. Set up email notifications
6. Deploy to production

## 🐛 Troubleshooting

- **Port conflicts:** Change ports in `.env` files if needed
- **MongoDB:** Ensure MongoDB is running locally or update connection string
- **Dependencies:** Run `npm install` in both directories if modules are missing

Happy coding! 🚀
