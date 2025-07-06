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
    const [anchorEl, setAnchorEl] = useState(null);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        logout();
        handleUserMenuClose();
        navigate('/');
    };

    const navigationItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Lessons', path: '/lessons' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <DirectionsCar sx={{ mr: 1 }} />
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
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}

                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    color="inherit"
                                    onClick={handleUserMenuOpen}
                                    sx={{ ml: 1 }}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    anchorEl={userMenuAnchor}
                                    open={Boolean(userMenuAnchor)}
                                    onClose={handleUserMenuClose}
                                >
                                    <MenuItem onClick={handleUserMenuClose}>
                                        Welcome, {user?.name}
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to="/profile"
                                        onClick={handleUserMenuClose}
                                    >
                                        Profile
                                    </MenuItem>
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

                {/* Mobile Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: { width: '200px' },
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
