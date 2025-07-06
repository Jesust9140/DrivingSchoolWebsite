import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    IconButton,
    Divider,
} from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    Phone,
    Email,
    LocationOn,
    DirectionsCar,
} from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                pt: 6,
                pb: 3,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Company Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <DirectionsCar sx={{ mr: 1 }} />
                            <Typography variant="h6" fontWeight="bold">
                                Image Driving School
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Professional driving instruction with experienced, certified
                            instructors. Learn to drive safely and confidently with our
                            comprehensive lessons.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                href="https://facebook.com"
                                target="_blank"
                                sx={{ color: 'white' }}
                            >
                                <Facebook />
                            </IconButton>
                            <IconButton
                                href="https://twitter.com"
                                target="_blank"
                                sx={{ color: 'white' }}
                            >
                                <Twitter />
                            </IconButton>
                            <IconButton
                                href="https://instagram.com"
                                target="_blank"
                                sx={{ color: 'white' }}
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton
                                href="https://linkedin.com"
                                target="_blank"
                                sx={{ color: 'white' }}
                            >
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="/" color="inherit" underline="hover">
                                Home
                            </Link>
                            <Link href="/about" color="inherit" underline="hover">
                                About Us
                            </Link>
                            <Link href="/lessons" color="inherit" underline="hover">
                                Driving Lessons
                            </Link>
                            <Link href="/contact" color="inherit" underline="hover">
                                Contact
                            </Link>
                            <Link href="/register" color="inherit" underline="hover">
                                Sign Up
                            </Link>
                        </Box>
                    </Grid>

                    {/* Services */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Our Services
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="body2">
                                • Manual Transmission Lessons
                            </Typography>
                            <Typography variant="body2">
                                • Automatic Transmission Lessons
                            </Typography>
                            <Typography variant="body2">
                                • Intensive Driving Courses
                            </Typography>
                            <Typography variant="body2">
                                • Refresher Courses
                            </Typography>
                            <Typography variant="body2">
                                • Theory Test Preparation
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Contact Info
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Phone fontSize="small" />
                                <Typography variant="body2">
                                    +1 (555) 123-4567
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Email fontSize="small" />
                                <Typography variant="body2">
                                    info@imagedrivingschool.com
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOn fontSize="small" />
                                <Typography variant="body2">
                                    123 Main Street, City, State 12345
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" fontWeight="bold">
                                Business Hours:
                            </Typography>
                            <Typography variant="body2">
                                Mon - Fri: 8:00 AM - 8:00 PM
                            </Typography>
                            <Typography variant="body2">
                                Sat - Sun: 9:00 AM - 6:00 PM
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

                {/* Copyright */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Typography variant="body2">
                        © 2025 Image Driving School. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Link href="/privacy" color="inherit" underline="hover">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" color="inherit" underline="hover">
                            Terms of Service
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
