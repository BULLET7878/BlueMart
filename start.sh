#!/bin/bash

# Define directories for backend and frontend
BACKEND_DIR="./server"
FRONTEND_DIR="./client"
FRONTEND_BUILD_DIR="./client/dist"

# Function to start backend
start_backend() {
  echo "Starting backend..."
  cd $BACKEND_DIR || exit
  echo "Installing backend dependencies..."
  npm install
  echo "Starting backend server..."
  npm start &
  BACKEND_PID=$!
  cd - || exit
}

# Function to start frontend
start_frontend() {
  echo "Starting frontend..."
  cd $FRONTEND_DIR || exit
  echo "Installing frontend dependencies..."
  npm install
  echo "Building frontend..."
  npm run build
  echo "Serving frontend build..."
  npx serve -s $FRONTEND_BUILD_DIR &
  FRONTEND_PID=$!
  cd - || exit
}

# Start backend and frontend
start_backend
start_frontend

# Wait for both processes to finish
echo "Backend and frontend are running."
wait $BACKEND_PID $FRONTEND_PID