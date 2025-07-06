import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
// TODO: Create these missing pages - they're referenced in Navbar but don't exist yet
// TODO: import About from './pages/About';
// TODO: import Lessons from './pages/Lessons'; 
// TODO: import Contact from './pages/Contact';
// TODO: import Login from './pages/Login';
// TODO: import Register from './pages/Register';
// TODO: import Dashboard from './pages/Dashboard'; // for user dashboard after login
// TODO: import Profile from './pages/Profile'; // for user profile management

// TODO: Consider adding these advanced pages later:
// TODO: import AdminDashboard from './pages/AdminDashboard'; // for admin management
// TODO: import BookingHistory from './pages/BookingHistory'; // user booking history
// TODO: import InstructorDashboard from './pages/InstructorDashboard'; // instructor features

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    // TODO: Add more color variants for better UI
    // TODO: Add custom colors for success, warning, info states
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // TODO: Customize typography scales for better hierarchy
    // TODO: Add custom font weights and sizes for driving school branding
  },
  // TODO: Add custom breakpoints if needed for responsive design
  // TODO: Add custom spacing and shape configurations
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* TODO: Uncomment these routes once I create the pages */}
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/lessons" element={<Lessons />} /> */}
                {/* <Route path="/contact" element={<Contact />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/register" element={<Register />} /> */}
                
                {/* TODO: Add protected routes that require authentication */}
                {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
                {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
                {/* <Route path="/booking-history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} /> */}
                
                {/* TODO: Add admin-only routes */}
                {/* <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> */}
                
                {/* TODO: Add instructor-only routes */}
                {/* <Route path="/instructor" element={<InstructorRoute><InstructorDashboard /></InstructorRoute>} /> */}
                
                {/* TODO: Add 404 page for unmatched routes */}
                {/* <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
