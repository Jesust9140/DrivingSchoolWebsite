#!/bin/bash

echo "🚗 Setting up Image Driving School Website..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "1. Start the backend: cd backend && npm run dev"
echo "2. Start the frontend: cd frontend && npm start"
echo ""
echo "📝 Don't forget to:"
echo "1. Set up your MongoDB database"
echo "2. Update the .env file in the backend directory"
echo "3. Run 'npm run seed' in the backend directory to add sample data"
echo ""
echo "🌐 Access the application at: http://localhost:3000"
echo "🔧 API server will run at: http://localhost:5000"
