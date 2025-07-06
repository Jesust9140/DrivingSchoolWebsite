import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
    MenuItem,
    Alert,
    CircularProgress,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { lessonAPI, userAPI, apiCall } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const BookingForm = ({ onBookingComplete }) => {
    // TODO: Add form validation state for better user experience
    // TODO: Consider breaking this into smaller components for better maintainability
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [studentInfo, setStudentInfo] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        // TODO: Add more fields like emergency contact, license status, etc.
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    
    const { isAuthenticated, user } = useAuth();

    const steps = ['Select Lesson', 'Choose Date & Time', 'Confirm Details'];
    // TODO: Add progress indicators for each step
    // TODO: Consider adding a review step before final submission

    // TODO: Make time slots dynamic based on instructor availability
    // TODO: Fetch available slots from backend based on selected date and lesson
    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
        '5:00 PM', '6:00 PM'
    ];

    useEffect(() => {
        fetchLessons();
        if (isAuthenticated && user) {
            // TODO: Pre-fill more user data if available
            setStudentInfo(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            }));
        }
    }, [isAuthenticated, user]);

    const fetchLessons = async () => {
        // TODO: Add loading state while fetching lessons
        // TODO: Add retry mechanism for failed requests
        const result = await apiCall(lessonAPI.getLessons);
        if (result.success) {
            setLessons(result.data.data || []);
        } else {
            setError('Failed to load lessons');
            // TODO: Add retry button for failed lesson loading
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // TODO: Add real-time validation for each field
        // TODO: Add debounced validation for email format
        setStudentInfo(prev => ({
            ...prev,
            [name]: value,
        }));
        // TODO: Clear field-specific errors when user starts typing
    };

    const handleNext = () => {
        // TODO: Implement comprehensive validation for each step
        if (activeStep === 0 && !selectedLesson) {
            setError('Please select a lesson');
            return;
        }
        if (activeStep === 1 && (!selectedDate || !selectedTime)) {
            setError('Please select date and time');
            return;
        }
        // TODO: Add validation for final step (contact info)
        setError('');
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
        setError(''); // Clear errors when going back
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // TODO: Add comprehensive form validation
        if (!selectedLesson || !selectedDate || !selectedTime) {
            setError('Please fill in all required fields');
            return;
        }

        // TODO: Validate email format and phone number
        // TODO: Check if selected time slot is still available
        
        setLoading(true);
        setError('');

        try {
            const bookingData = {
                lessonId: selectedLesson,
                date: selectedDate,
                time: selectedTime,
                studentInfo,
                // TODO: Add additional booking metadata
            };

            // TODO: Call booking API endpoint
            const result = await apiCall(userAPI.bookLesson, bookingData);
            
            if (result.success) {
                setSuccess('Booking submitted successfully! We will contact you soon.');
                resetForm();
                if (onBookingComplete) {
                    onBookingComplete(result.data);
                }
                // TODO: Send confirmation email
                // TODO: Redirect to booking confirmation page
            } else {
                setError(result.error || 'Booking failed. Please try again.');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            // TODO: Log error for debugging
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSelectedLesson('');
        setSelectedDate(null);
        setSelectedTime('');
        setActiveStep(0);
        if (!isAuthenticated) {
            setStudentInfo({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
        }
        // TODO: Add animation for form reset
    };

    const selectedLessonData = lessons.find(lesson => lesson._id === selectedLesson);
    // TODO: Add lesson preview component showing details, price, duration

    // TODO: Add conditional rendering based on user authentication status
    // TODO: Add different flows for logged-in vs guest users
    // TODO: Implement save as draft functionality for logged-in users

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
                <CardContent>
                    <Typography variant="h4" component="h2" gutterBottom align="center">
                        Book a Lesson
                        {/* TODO: Add subtitle with instructions */}
                    </Typography>

                    {/* Progress Stepper */}
                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {/* TODO: Add step descriptions below stepper */}

                    {/* Error/Success Messages */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                            {/* TODO: Add retry button for certain errors */}
                        </Alert>
                    )}
                    
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        {/* Step 1: Select Lesson */}
                        {activeStep === 0 && (
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Select Lesson Type"
                                        value={selectedLesson}
                                        onChange={(e) => setSelectedLesson(e.target.value)}
                                        fullWidth
                                        required
                                    >
                                        {lessons.map((lesson) => (
                                            <MenuItem key={lesson._id} value={lesson._id}>
                                                {lesson.title} - ${lesson.price}
                                                {/* TODO: Add lesson duration and instructor info */}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                
                                {/* TODO: Add lesson details card when one is selected */}
                                {selectedLessonData && (
                                    <Grid item xs={12}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant="h6">
                                                    {selectedLessonData.title}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    {selectedLessonData.description}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    Duration: {selectedLessonData.duration} hour(s)
                                                </Typography>
                                                <Typography variant="body2">
                                                    Price: ${selectedLessonData.price}
                                                </Typography>
                                                {/* TODO: Add instructor info */}
                                                {/* TODO: Add lesson features/includes */}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )}
                            </Grid>
                        )}

                        {/* Step 2: Date and Time Selection */}
                        {activeStep === 1 && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <DatePicker
                                        label="Select Date"
                                        value={selectedDate}
                                        onChange={setSelectedDate}
                                        renderInput={(params) => <TextField {...params} fullWidth required />}
                                        minDate={new Date()}
                                        // TODO: Add maxDate (e.g., 3 months from now)
                                        // TODO: Disable unavailable dates based on instructor schedule
                                    />
                                </Grid>
                                
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        label="Select Time"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        fullWidth
                                        required
                                        disabled={!selectedDate}
                                    >
                                        {timeSlots.map((time) => (
                                            <MenuItem key={time} value={time}>
                                                {time}
                                                {/* TODO: Show availability status for each slot */}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                
                                {/* TODO: Add calendar view for better date selection */}
                                {/* TODO: Show instructor availability for selected date */}
                            </Grid>
                        )}

                        {/* Step 3: Student Information */}
                        {activeStep === 2 && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Full Name"
                                        name="name"
                                        value={studentInfo.name}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        disabled={isAuthenticated}
                                        // TODO: Add name validation
                                    />
                                </Grid>
                                
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={studentInfo.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        disabled={isAuthenticated}
                                        // TODO: Add email format validation
                                    />
                                </Grid>
                                
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Phone Number"
                                        name="phone"
                                        value={studentInfo.phone}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                        // TODO: Add phone number format validation
                                        // TODO: Add phone number formatting as user types
                                    />
                                </Grid>
                                
                                {/* TODO: Add more fields like emergency contact, license status */}
                                
                                <Grid item xs={12}>
                                    <TextField
                                        label="Additional Message (Optional)"
                                        name="message"
                                        value={studentInfo.message}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        rows={3}
                                        placeholder="Any special requirements or questions?"
                                    />
                                </Grid>

                                {/* Booking Summary */}
                                <Grid item xs={12}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Booking Summary
                                            </Typography>
                                            <Typography>
                                                <strong>Lesson:</strong> {selectedLessonData?.title}
                                            </Typography>
                                            <Typography>
                                                <strong>Date:</strong> {selectedDate?.toDateString()}
                                            </Typography>
                                            <Typography>
                                                <strong>Time:</strong> {selectedTime}
                                            </Typography>
                                            <Typography>
                                                <strong>Duration:</strong> {selectedLessonData?.duration} hour(s)
                                            </Typography>
                                            <Typography variant="h6" sx={{ mt: 1 }}>
                                                <strong>Total: ${selectedLessonData?.price}</strong>
                                            </Typography>
                                            {/* TODO: Add payment method selection */}
                                            {/* TODO: Add terms and conditions checkbox */}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        )}

                        {/* Navigation Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                variant="outlined"
                            >
                                Back
                            </Button>
                            
                            {activeStep === steps.length - 1 ? (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    sx={{ minWidth: 120 }}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Book Lesson'}
                                </Button>
                            ) : (
                                <Button onClick={handleNext} variant="contained">
                                    Next
                                </Button>
                            )}
                        </Box>
                        
                        {/* TODO: Add save as draft button for logged-in users */}
                        {/* TODO: Add estimated response time information */}
                    </Box>
                </CardContent>
            </Card>
        </LocalizationProvider>
    );
};

export default BookingForm;
