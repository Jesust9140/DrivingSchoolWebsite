import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Avatar,
    Rating,
} from '@mui/material';
import {
    DirectionsCar,
    School,
    Security,
    Groups,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {
    const features = [
        {
            icon: <DirectionsCar fontSize="large" />,
            title: 'Professional Instructors',
            description: 'Learn from certified, experienced driving instructors with years of teaching experience.',
        },
        {
            icon: <School fontSize="large" />,
            title: 'Comprehensive Courses',
            description: 'From basic lessons to advanced driving techniques, we offer courses for all skill levels.',
        },
        {
            icon: <Security fontSize="large" />,
            title: 'Safety First',
            description: 'Our top priority is your safety. Learn defensive driving and road safety principles.',
        },
        {
            icon: <Groups fontSize="large" />,
            title: 'Flexible Scheduling',
            description: 'Book lessons at your convenience with our flexible scheduling system.',
        },
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            rating: 5,
            comment: 'Excellent driving school! The instructors are patient and professional. I passed my test on the first try!',
            avatar: '/api/placeholder/60/60',
        },
        {
            name: 'Mike Chen',
            rating: 5,
            comment: 'Great experience learning to drive here. The lessons were well-structured and the car was always clean and well-maintained.',
            avatar: '/api/placeholder/60/60',
        },
        {
            name: 'Emma Davis',
            rating: 5,
            comment: 'Highly recommend! The instructors made me feel confident behind the wheel. Worth every penny.',
            avatar: '/api/placeholder/60/60',
        },
    ];

    const stats = [
        { number: '2000+', label: 'Students Trained' },
        { number: '95%', label: 'Pass Rate' },
        { number: '10+', label: 'Years Experience' },
        { number: '24/7', label: 'Support' },
    ];

    return (
        <Box sx={{ mt: 8 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    color: 'white',
                    py: 12,
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                        Learn to Drive with Confidence
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                        Professional driving lessons with experienced instructors
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            component={Link}
                            to="/lessons"
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: 'white',
                                color: '#1976d2',
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                        >
                            Book a Lesson
                        </Button>
                        <Button
                            component={Link}
                            to="/about"
                            variant="outlined"
                            size="large"
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Learn More
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
                    Why Choose Image Driving School?
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    We provide comprehensive driving education with a focus on safety and confidence
                </Typography>

                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
                                    p: 3,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                    },
                                }}
                                elevation={2}
                            >
                                <Box sx={{ color: '#1976d2', mb: 2 }}>
                                    {feature.icon}
                                </Box>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Stats Section */}
            <Box sx={{ backgroundColor: '#f5f5f5', py: 6 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} textAlign="center">
                        {stats.map((stat, index) => (
                            <Grid item xs={6} md={3} key={index}>
                                <Typography variant="h3" fontWeight="bold" color="primary">
                                    {stat.number}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {stat.label}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
                    What Our Students Say
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    Don't just take our word for it - hear from our satisfied students
                </Typography>

                <Grid container spacing={4}>
                    {testimonials.map((testimonial, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card sx={{ height: '100%', p: 3 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar
                                            src={testimonial.avatar}
                                            sx={{ mr: 2, width: 60, height: 60 }}
                                        >
                                            {testimonial.name.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold">
                                                {testimonial.name}
                                            </Typography>
                                            <Rating value={testimonial.rating} readOnly size="small" />
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        "{testimonial.comment}"
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box
                sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    py: 8,
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h3" gutterBottom fontWeight="bold">
                        Ready to Start Your Driving Journey?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                        Join thousands of successful students who learned to drive with us
                    </Typography>
                    <Button
                        component={Link}
                        to="/register"
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: 'white',
                            color: '#1976d2',
                            px: 4,
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            },
                        }}
                    >
                        Get Started Today
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
