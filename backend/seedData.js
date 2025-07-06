const mongoose = require('mongoose');
const Lesson = require('./models/lessonModel');
const User = require('./models/userModel');
require('dotenv').config();

// Sample lesson data
const sampleLessons = [
    {
        title: "Basic Driving Course",
        description: "Perfect for beginners! Learn the fundamentals of driving including vehicle controls, basic maneuvers, and road safety. This comprehensive course covers everything you need to know to start your driving journey.",
        price: 150,
        duration: 2,
        category: "practical",
        instructor: "John Smith",
        features: [
            "Vehicle familiarization",
            "Basic controls and safety checks",
            "Parking and maneuvering",
            "Traffic rules and road signs",
            "Defensive driving basics"
        ],
        availableSlots: [
            { date: new Date('2025-01-15'), time: '9:00 AM', isBooked: false },
            { date: new Date('2025-01-15'), time: '11:00 AM', isBooked: false },
            { date: new Date('2025-01-16'), time: '2:00 PM', isBooked: false },
        ]
    },
    {
        title: "Manual Transmission Mastery",
        description: "Master the art of driving manual transmission vehicles. Learn clutch control, gear shifting, hill starts, and advanced manual driving techniques.",
        price: 180,
        duration: 2.5,
        category: "practical",
        instructor: "Sarah Johnson",
        features: [
            "Clutch control techniques",
            "Smooth gear transitions",
            "Hill start mastery",
            "Traffic driving with manual",
            "Advanced manual techniques"
        ],
        availableSlots: [
            { date: new Date('2025-01-17'), time: '10:00 AM', isBooked: false },
            { date: new Date('2025-01-18'), time: '3:00 PM', isBooked: false },
        ]
    },
    {
        title: "Intensive 5-Day Course",
        description: "Fast-track your driving skills with our intensive 5-day course. Perfect for those who want to learn quickly and efficiently. Includes both theory and practical components.",
        price: 599,
        duration: 25,
        category: "intensive",
        instructor: "Mike Davis",
        features: [
            "5 consecutive days of training",
            "Theory and practical combined",
            "Mock driving test",
            "Personalized feedback",
            "Test booking assistance"
        ],
        availableSlots: [
            { date: new Date('2025-01-20'), time: '9:00 AM', isBooked: false },
            { date: new Date('2025-01-27'), time: '9:00 AM', isBooked: false },
        ]
    },
    {
        title: "Refresher Course",
        description: "Brush up on your driving skills with our refresher course. Ideal for licensed drivers who want to regain confidence or learn new techniques.",
        price: 120,
        duration: 1.5,
        category: "refresher",
        instructor: "Emma Wilson",
        features: [
            "Confidence building",
            "Modern driving techniques",
            "City driving tips",
            "Parking skill improvement",
            "Highway driving practice"
        ],
        availableSlots: [
            { date: new Date('2025-01-16'), time: '1:00 PM', isBooked: false },
            { date: new Date('2025-01-19'), time: '4:00 PM', isBooked: false },
        ]
    },
    {
        title: "Theory Test Preparation",
        description: "Comprehensive theory test preparation including highway code, hazard perception, and mock tests. Increase your chances of passing on the first attempt.",
        price: 80,
        duration: 3,
        category: "theory",
        instructor: "David Brown",
        features: [
            "Highway code study",
            "Hazard perception training",
            "Mock theory tests",
            "Study materials included",
            "Online practice access"
        ],
        availableSlots: [
            { date: new Date('2025-01-14'), time: '6:00 PM', isBooked: false },
            { date: new Date('2025-01-21'), time: '6:00 PM', isBooked: false },
        ]
    },
    {
        title: "Automatic Transmission Course",
        description: "Learn to drive with automatic transmission vehicles. Focus on road awareness, traffic navigation, and building confidence without worrying about gear changes.",
        price: 140,
        duration: 2,
        category: "practical",
        instructor: "Lisa Garcia",
        features: [
            "Automatic vehicle familiarization",
            "Traffic navigation",
            "Parking and maneuvering",
            "Road awareness training",
            "Confidence building"
        ],
        availableSlots: [
            { date: new Date('2025-01-15'), time: '3:00 PM', isBooked: false },
            { date: new Date('2025-01-17'), time: '1:00 PM', isBooked: false },
        ]
    }
];

// Sample admin user
const adminUser = {
    name: "Admin User",
    email: "admin@imagedrivingschool.com",
    password: "admin123",
    phone: "+1234567890",
    role: "admin"
};

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Clear existing data
        await Lesson.deleteMany({});
        await User.deleteMany({});
        
        console.log('Cleared existing data');

        // Insert sample lessons
        const lessons = await Lesson.insertMany(sampleLessons);
        console.log(`Inserted ${lessons.length} sample lessons`);

        // Insert admin user
        const admin = await User.create(adminUser);
        console.log('Created admin user');

        console.log('Database seeded successfully!');
        console.log('\n--- Sample Data Overview ---');
        console.log(`Lessons created: ${lessons.length}`);
        console.log(`Admin user: ${admin.email} (password: admin123)`);
        console.log('\n--- Available Lesson Types ---');
        lessons.forEach(lesson => {
            console.log(`- ${lesson.title}: $${lesson.price} (${lesson.duration}h)`);
        });

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
        process.exit(0);
    }
};

// Run the seeder
seedDatabase();
