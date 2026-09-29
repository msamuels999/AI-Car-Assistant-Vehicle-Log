# AI Car Assistant - Vehicle Log

## Description

AI Car Assistant - Vehicle Log is a simple web application that allows users to keep track of vehicle maintenance, repairs, inspections, and other vehicle-related issues.

Users can create an account, log in securely, and manage their own vehicle records. Each user's information is stored in a Supabase database and protected using authentication and Row Level Security.

This application was developed for Engineering Design 2 using AI-assisted software development tools.

## Live Application

Link to deployed Application: https://aquamarine-malasada-bf7eca.netlify.app/

## Features

- User registration
- User login
- User logout
- Add vehicle records
- View saved vehicle records
- Edit existing records
- Delete records
- Secure user-specific database access

## CRUD Functionality

The application supports all four CRUD operations:

- Create - Add a new vehicle record
- Read - View saved vehicle records
- Update - Edit an existing vehicle record
- Delete - Remove a vehicle record

## Technologies Used

- HTML
- CSS
- JavaScript
- Supabase
- Supabase Authentication
- PostgreSQL Database
- Git
- GitHub
- Netlify
- ChatGPT

## Database

The application uses Supabase for its backend database.

The `vehicle_logs` table stores:

- Record ID
- User ID
- Title
- Category
- Record date
- Notes
- Creation date

Row Level Security is used so authenticated users can only access and modify their own vehicle records.

## Setup Instructions

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/msamuels999/AI-Car-Assistant-Vehicle-Log.git