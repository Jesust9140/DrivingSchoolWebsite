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
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [studentInfo, setStudentInfo] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    
    const { isAuthenticated, user } = useAuth();

    const steps = ['Select Lesson', 'Choose Date & Time', 'Confirm Details'];

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
        '5:00 PM', '6:00 PM'
    ];

    useEffect(() => {
        fetchLessons();
        if (isAuthenticated && user) {
            setStudentInfo(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            }));
        }
    }, [isAuthenticated, user]);

    const fetchLessons = async () => {
        const result = await apiCall(lessonAPI.getLessons);
        if (result.success) {
            setLessons(result.data.data || []);
        } else {
            setError('Failed to load lessons');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentInfo(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNext = () => {
        if (activeStep === 0 && !selectedLesson) {
            setError('Please select a lesson');
            return;
        }
        if (activeStep === 1 && (!selectedDate || !selectedTime)) {
            setError('Please select date and time');
            return;
        }
        setError('');
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedLesson || !selectedDate || !selectedTime) {
            setError('Please fill in all required fields');
            return;
        }

        if (!studentInfo.name || !studentInfo.email || !studentInfo.phone) {
            setError('Please fill in all student information');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const bookingData = {
                lessonId: selectedLesson,
                date: selectedDate,
                time: selectedTime,
                studentInfo,
            };

            if (isAuthenticated) {
                const result = await apiCall(userAPI.bookLesson, bookingData);
                if (result.success) {
                    setSuccess('Lesson booked successfully! We will contact you soon to confirm.');
                    if (onBookingComplete) onBookingComplete();
                    resetForm();
                } else {
                    setError(result.error || 'Booking failed');
                }
            } else {
                // For non-authenticated users, just show success message
                // In a real app, you might want to send an email or store in a temporary collection
                setSuccess('Booking request submitted! Please register or login to manage your bookings.');
                resetForm();
            }
        } catch (error) {
            setError('An error occurred while booking the lesson');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSelectedLesson('');
        setSelectedDate(null);
        setSelectedTime('');
        setStudentInfo({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            message: '',
        });
        setActiveStep(0);
    };

    const selectedLessonData = lessons.find(lesson => lesson._id === selectedLesson);

    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant="h5" gutterBottom align="center">
                    Book a Driving Lesson
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Select Lesson */}
                    {activeStep === 0 && (
                        <Box>
                            <TextField
                                select
                                fullWidth
                                label="Select Lesson Type"
                                value={selectedLesson}
                                onChange={(e) => setSelectedLesson(e.target.value)}
                                margin="normal"
                                required
                            >
                                {lessons.map((lesson) => (
                                    <MenuItem key={lesson._id} value={lesson._id}>
                                        {lesson.title} - ${lesson.price}
                                    </MenuItem>
                                ))}
                            </TextField>

                            {selectedLessonData && (
                                <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                                    <Typography variant="h6">{selectedLessonData.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedLessonData.description}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                        Price: ${selectedLessonData.price} | Duration: {selectedLessonData.duration} hour(s)
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* Step 2: Select Date and Time */}
                    {activeStep === 1 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Select Date"
                                        value={selectedDate}
                                        onChange={setSelectedDate}
                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth margin="normal" required />
                                        )}
                                        minDate={new Date()}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Select Time"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    margin="normal"
                                    required
                                >
                                    {timeSlots.map((time) => (
                                        <MenuItem key={time} value={time}>
                                            {time}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    )}

                    {/* Step 3: Student Information */}
                    {activeStep === 2 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={studentInfo.name}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={studentInfo.email}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    value={studentInfo.phone}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Additional Message (Optional)"
                                    name="message"
                                    value={studentInfo.message}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    multiline
                                    rows={3}
                                />
                            </Grid>

                            {/* Booking Summary */}
                            <Grid item xs={12}>
                                <Box sx={{ mt: 2, p: 2, backgroundColor: '#f0f8ff', borderRadius: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Booking Summary
                                    </Typography>
                                    <Typography>
                                        <strong>Lesson:</strong> {selectedLessonData?.title}
                                    </Typography>
                                    <Typography>
                                        <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
                                    </Typography>
                                    <Typography>
                                        <strong>Time:</strong> {selectedTime}
                                    </Typography>
                                    <Typography>
                                        <strong>Duration:</strong> {selectedLessonData?.duration} hour(s)
                                    </Typography>
                                    <Typography>
                                        <strong>Price:</strong> ${selectedLessonData?.price}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    )}

                    {/* Navigation Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            Back
                        </Button>
                        
                        {activeStep === steps.length - 1 ? (
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Book Lesson'}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleNext}
                            >
                                Next
                            </Button>
                        )}
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
};

export default BookingForm;
