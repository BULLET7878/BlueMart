#!/bin/bash
set -e

BACKEND_DIR="./server"
FRONTEND_DIR="./client"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
die()  { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# Cleanup function
cleanup() {
  warn "Shutting down gracefully..."
  
  # Terminate processes strictly
  if [[ -n "$BACKEND_PID" ]] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID" 2>/dev/null
  fi
  
  if [[ -n "$FRONTEND_PID" ]] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
    kill "$FRONTEND_PID" 2>/dev/null
  fi
  
  # Free hanging ports idempotently
  lsof -ti:4000 | xargs kill -9 2>/dev/null || true
  lsof -ti:5173 | xargs kill -9 2>/dev/null || true
  
  log "Shutdown complete."
  exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# Check required tools
for cmd in node npm npx; do
  command -v "$cmd" &>/dev/null || die "'$cmd' is not installed."
done

# Install deps only if needed (idempotent)
install_if_needed() {
  if [ ! -d "node_modules" ]; then
    log "Installing dependencies..."
    npm ci
  else
    log "Dependencies already installed, skipping..."
  fi
}

start_backend() {
  log "Starting backend..."

  cd "$BACKEND_DIR"
  install_if_needed

  npm start &
  BACKEND_PID=$!
  cd - > /dev/null

  log "Backend running (PID: $BACKEND_PID)"
}

start_frontend() {
  log "Starting frontend..."

  cd "$FRONTEND_DIR"
  install_if_needed

  log "Building frontend..."
  npm run build

  log "Serving frontend..."
  npx serve -s dist &
  FRONTEND_PID=$!

  cd - > /dev/null

  log "Frontend running (PID: $FRONTEND_PID)"
}

# Run services
start_backend
start_frontend

log "Both services are up. Press Ctrl+C to stop."
wait "$BACKEND_PID" "$FRONTEND_PID"