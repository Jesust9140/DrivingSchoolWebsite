# Image Driving School Website

A modern, responsive driving school website built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚗 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **User Authentication**: Secure registration and login system
- **Lesson Booking**: Interactive booking system with date/time selection
- **Course Management**: Different types of driving lessons and courses
- **User Dashboard**: Track bookings and manage profile
- **Admin Panel**: Manage lessons, users, and bookings
- **Modern UI**: Built with Material-UI components
- **RESTful API**: Clean and documented API endpoints

## 🛠️ Tech Stack

### Frontend

- **React.js** - User interface library
- **Material-UI** - Component library and design system
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
drivingschool-website/
├── backend/
│   ├── controllers/
│   │   ├── lessonController.js
│   │   ├── userController.js
│   ├── models/
│   │   ├── lessonModel.js
│   │   ├── userModel.js
│   ├── routes/
│   │   ├── lessonRoutes.js
│   │   ├── userRoutes.js
│   ├── config/
│   │   ├── db.js
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── BookingForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Lessons.jsx
│   │   │   ├── Contact.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd drivingschool-website
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the backend directory:

   ```env
   MONGO_URI=mongodb://localhost:27017/driving_school
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```

5. **Start the Development Servers**

   **Backend** (from backend directory):

   ```bash
   npm run dev
   ```

   **Frontend** (from frontend directory):

   ```bash
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 📚 API Endpoints

### Authentication

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Lessons

- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get single lesson
- `POST /api/lessons` - Create lesson (admin)
- `PUT /api/lessons/:id` - Update lesson (admin)
- `DELETE /api/lessons/:id` - Delete lesson (admin)

### Bookings

- `POST /api/users/book` - Book a lesson (protected)

## 🎨 UI Components

### Pages

- **Home**: Hero section, features, testimonials, CTA
- **About**: Company information, team, values
- **Lessons**: Available courses and pricing
- **Contact**: Contact form and information
- **Login/Register**: Authentication forms

### Components

- **Navbar**: Responsive navigation with auth state
- **Footer**: Company info, links, contact details
- **BookingForm**: Multi-step lesson booking process
- **FeatureCard**: Reusable feature display component

## 🔧 Development

### Running Tests

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

### Building for Production

```bash
# Frontend build
cd frontend && npm run build

# Backend production
cd backend && npm start
```

## 🌐 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)

1. Set environment variables
2. Deploy backend code
3. Configure database connection

### Frontend Deployment (Netlify/Vercel)

1. Build the React app
2. Deploy to hosting platform
3. Configure API URL environment variable

### Environment Variables for Production

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/driving_school
JWT_SECRET=your_complex_jwt_secret
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

## 📱 Features Overview

### For Students

- Browse available lessons and courses
- Register and create profile
- Book lessons with preferred date/time
- View booking history
- Update profile information

### For Instructors

- View assigned lessons
- Update lesson status
- Manage availability

### For Admins

- Manage all lessons and courses
- View all user bookings
- User management
- Analytics and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

**Image Driving School**

- Email: info@imagedrivingschool.com
- Phone: +1 (555) 123-4567
- Address: 123 Main Street, City, State 12345

## 🙏 Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- MongoDB for the database solution
- All contributors and supporters

---

**Happy Driving! 🚗💨**
