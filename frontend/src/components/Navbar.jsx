import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Menu as MenuIcon,
    DirectionsCar,
    AccountCircle,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    // TODO: Consider adding state for notification badge count when I implement notifications
    const [anchorEl, setAnchorEl] = useState(null);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // TODO: Add loading state management for better UX during auth operations
    // TODO: Add error handling for failed logout attempts

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleUserMenuOpen = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const handleLogout = () => {
        // TODO: Add confirmation dialog before logout
        // TODO: Clear any cached data or user preferences
        // TODO: Add loading state during logout process
        logout();
        handleUserMenuClose();
        navigate('/');
        // TODO: Show success message after logout
    };

    // TODO: Make this dynamic based on user role (student/instructor/admin)
    // TODO: Add conditional menu items based on authentication status
    const navigationItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' }, // TODO: Create About page
        { label: 'Lessons', path: '/lessons' }, // TODO: Create Lessons page
        { label: 'Contact', path: '/contact' }, // TODO: Create Contact page
        // TODO: Add these conditional items:
        // ...(isAuthenticated ? [{ label: 'Dashboard', path: '/dashboard' }] : []),
        // ...(user?.role === 'admin' ? [{ label: 'Admin', path: '/admin' }] : []),
        // ...(user?.role === 'instructor' ? [{ label: 'Instructor', path: '/instructor' }] : []),
    ];

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
            {/* TODO: Make navbar color customizable through theme or settings */}
            {/* TODO: Add scroll behavior - hide/show navbar on scroll */}
            <Toolbar>
                {/* Logo and Brand Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <DirectionsCar sx={{ mr: 1 }} />
                    {/* TODO: Replace DirectionsCar with custom logo image */}
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 'bold',
                        }}
                    >
                        Image Driving School
                        {/* TODO: Make school name configurable through environment variables */}
                        {/* TODO: Add tagline below school name for branding */}
                    </Typography>
                </Box>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {navigationItems.map((item) => (
                            <Button
                                key={item.label}
                                component={Link}
                                to={item.path}
                                color="inherit"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    // TODO: Add active state styling to highlight current page
                                    // TODO: Add transition animations for better UX
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}

                        {/* Authentication Section */}
                        {isAuthenticated ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* TODO: Add notification bell icon with badge count */}
                                {/* TODO: Add quick booking button for authenticated users */}
                                <IconButton
                                    color="inherit"
                                    onClick={handleUserMenuOpen}
                                    sx={{ ml: 1 }}
                                >
                                    <AccountCircle />
                                    {/* TODO: Replace with user avatar image when implemented */}
                                </IconButton>
                                <Menu
                                    anchorEl={userMenuAnchor}
                                    open={Boolean(userMenuAnchor)}
                                    onClose={handleUserMenuClose}
                                >
                                    <MenuItem onClick={handleUserMenuClose}>
                                        Welcome, {user?.name}
                                        {/* TODO: Add user role badge next to name */}
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to="/profile"
                                        onClick={handleUserMenuClose}
                                    >
                                        Profile
                                        {/* TODO: Create Profile page */}
                                    </MenuItem>
                                    {/* TODO: Add conditional menu items based on user role */}
                                    {/* TODO: Add "My Bookings" menu item */}
                                    {/* TODO: Add "Settings" menu item */}
                                    {/* TODO: Add divider before logout */}
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                    component={Link}
                                    to="/login"
                                    color="inherit"
                                    variant="outlined"
                                    sx={{
                                        borderColor: 'white',
                                        '&:hover': {
                                            borderColor: 'white',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    Login
                                    {/* TODO: Create Login page */}
                                </Button>
                                <Button
                                    component={Link}
                                    to="/register"
                                    color="inherit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'white',
                                        color: '#1976d2',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        },
                                    }}
                                >
                                    Sign Up
                                    {/* TODO: Create Register page */}
                                </Button>
                            </Box>
                        )}
                    </Box>
                )}

                {/* Mobile Menu Button */}
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Mobile Navigation Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: { width: '200px' },
                        // TODO: Add custom styling for mobile menu
                        // TODO: Add animation for menu open/close
                    }}
                >
                    {navigationItems.map((item) => (
                        <MenuItem
                            key={item.label}
                            component={Link}
                            to={item.path}
                            onClick={handleMenuClose}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                    {/* TODO: Add icons to mobile menu items for better UX */}
                    {isAuthenticated ? (
                        [
                            <MenuItem
                                key="profile"
                                component={Link}
                                to="/profile"
                                onClick={handleMenuClose}
                            >
                                Profile
                            </MenuItem>,
                            // TODO: Add "My Bookings" menu item
                            // TODO: Add divider before logout
                            <MenuItem key="logout" onClick={handleLogout}>
                                Logout
                            </MenuItem>,
                        ]
                    ) : (
                        [
                            <MenuItem
                                key="login"
                                component={Link}
                                to="/login"
                                onClick={handleMenuClose}
                            >
                                Login
                            </MenuItem>,
                            <MenuItem
                                key="register"
                                component={Link}
                                to="/register"
                                onClick={handleMenuClose}
                            >
                                Sign Up
                            </MenuItem>,
                        ]
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
