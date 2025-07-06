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
    // TODO: Fetch this data from backend API instead of hardcoding
    // TODO: Make features configurable through admin panel
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

    // TODO: Fetch testimonials from backend API
    // TODO: Add testimonial carousel/slider for more testimonials
    // TODO: Add photo upload functionality for testimonials
    const testimonials = [
        {
            name: 'Sarah Johnson',
            rating: 5,
            comment: 'Excellent driving school! The instructors are patient and professional. I passed my test on the first try!',
            avatar: '/api/placeholder/60/60', // TODO: Use real user avatars
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

    // TODO: Fetch real statistics from backend
    // TODO: Make statistics dynamic and update in real-time
    const stats = [
        { number: '2000+', label: 'Students Trained' },
        { number: '95%', label: 'Pass Rate' },
        { number: '10+', label: 'Years Experience' },
        { number: '24/7', label: 'Support' },
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    color: 'white',
                    py: { xs: 8, md: 12 },
                    textAlign: 'center',
                }}
            >
                {/* TODO: Add background image or video */}
                {/* TODO: Add animated elements or particles */}
                <Container maxWidth="md">
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                        }}
                    >
                        Learn to Drive with Confidence
                        {/* TODO: Make headline configurable through admin panel */}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 4,
                            opacity: 0.9,
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                        }}
                    >
                        Professional driving lessons with experienced instructors. 
                        Start your journey to becoming a safe and confident driver today.
                        {/* TODO: Make subtitle configurable */}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: 'white',
                                color: '#1976d2',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                            onClick={() => {
                                // TODO: Scroll to booking form or navigate to booking page
                                document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Book a Lesson
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            component={Link}
                            to="/lessons" // TODO: Create Lessons page
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            View Courses
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Statistics Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Box textAlign="center">
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#1976d2',
                                        mb: 1,
                                    }}
                                >
                                    {stat.number}
                                    {/* TODO: Add counter animation when section comes into view */}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {stat.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Features Section */}
            <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        textAlign="center"
                        gutterBottom
                        sx={{ fontWeight: 'bold', mb: 6 }}
                    >
                        Why Choose Us?
                        {/* TODO: Make section title configurable */}
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
                                            transform: 'translateY(-4px)',
                                            // TODO: Add more hover effects
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: '#1976d2',
                                            mb: 2,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h5" component="h3" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography
                    variant="h3"
                    component="h2"
                    textAlign="center"
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 6 }}
                >
                    What Our Students Say
                    {/* TODO: Make section title configurable */}
                </Typography>
                <Grid container spacing={4}>
                    {testimonials.map((testimonial, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            sx={{ mr: 2 }}
                                        />
                                        <Box>
                                            <Typography variant="h6" component="h4">
                                                {testimonial.name}
                                            </Typography>
                                            <Rating value={testimonial.rating} readOnly size="small" />
                                        </Box>
                                    </Box>
                                    <Typography variant="body1" color="text.secondary">
                                        "{testimonial.comment}"
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {/* TODO: Add "Load More Testimonials" button */}
                {/* TODO: Add testimonial submission form for students */}
            </Container>

            {/* Call to Action Section */}
            <Box
                sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    py: 8,
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h3" component="h2" gutterBottom>
                        Ready to Start Learning?
                        {/* TODO: Make CTA title configurable */}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                        Join thousands of satisfied students who have learned to drive with us. 
                        Book your first lesson today and take the first step towards driving independence.
                        {/* TODO: Make CTA description configurable */}
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: 'white',
                            color: '#1976d2',
                            px: 6,
                            py: 2,
                            fontSize: '1.2rem',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            },
                        }}
                        onClick={() => {
                            // TODO: Navigate to booking page or scroll to booking form
                            document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Book Your First Lesson
                    </Button>
                </Container>
            </Box>

            {/* TODO: Add booking form section here */}
            {/* <Box id="booking-section" sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <BookingForm />
                </Container>
            </Box> */}

            {/* TODO: Add FAQ section */}
            {/* TODO: Add instructor showcase section */}
            {/* TODO: Add recent blog posts section */}
            {/* TODO: Add contact information section */}
        </Box>
    );
};

export default Home;
