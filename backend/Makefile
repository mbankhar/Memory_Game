# Makefile for your memory game

.PHONY: all install build run clean

# Default target: install deps, build frontend, run app
all: install build run

# Install backend (Go) and frontend (Node) dependencies
install:
	@echo "Installing Go dependencies..."
	go mod init memory-game || true  # Ignore if already initialized
	go get github.com/gin-gonic/gin
	go get github.com/disintegration/imaging
	@echo "Installing Node dependencies..."
	cd ../frontend && npm install

# Build the React frontend
build:
	@echo "Building React frontend..."
	cd ../frontend && npm run build

# Run the full application (backend serves frontend)
run:
	@echo "Starting the game server..."
	go run main.go image_utils.go

# Clean up (optional, removes build files)
clean:
	@echo "Cleaning up..."
	rm -rf ../frontend/build
	go clean