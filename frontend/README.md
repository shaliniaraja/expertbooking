Real-Time Expert Session Booking System

This project is a Real-Time Expert Session Booking System built using React (Web), Node.js, Express, and MongoDB. Users can browse experts, view available slots, book sessions, and see real-time updates when other users book slots.

Features


Frontend

Expert Listing with search, category filter, and pagination
Expert Detail page showing available slots grouped by date
Click on a time slot to open a booking form
Booking form with validation and success message
My Bookings page to view all bookings by user
Booking statuses: Pending, Confirmed, Completed
Real-time slot updates via Socket.io

Backend

Node.js + Express server with proper folder structure
MongoDB for data storage

APIs:

GET /experts – list experts (supports search, filter, pagination)
GET /experts/:id – expert detail
POST /bookings – create booking (prevents double booking)
PATCH /bookings/:id/status – update booking status
GET /bookings?email= – get bookings for a user
Handles race conditions to prevent double booking
Emits Socket.io events for real-time updates


Installation

Clone the repository:

git clone <your-repo-url>

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install
Setup Environment Variables

Create a .env file in the backend folder:

MONGO_URI=<your-mongodb-connection-string>
PORT=5000

Installation

Clone the repository:

git clone <your-repo-url>

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install
Setup Environment Variables

Create a .env file in the backend folder:

MONGO_URI=<your-mongodb-connection-string>
PORT=5000

Running the App
Backend
cd backend
node server.js

Frontend
cd frontend
npm start

