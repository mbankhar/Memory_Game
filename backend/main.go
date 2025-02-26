package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Serve React build as the root
	router.Static("/static", "../frontend/build/static") // Serve static assets
	router.StaticFile("/index.html", "../frontend/build/index.html")
	router.GET("/", func(c *gin.Context) {
		c.File("../frontend/build/index.html") // Serve index.html for root
	})

	// Serve images and back
	router.Static("/images", "../images")
	router.Static("/back", "../back")

	// API routes
	router.POST("/upload", HandleUpload)
	router.POST("/start-game", startGame)

	// Ensure directories exist
	imagesDir := filepath.Join("..", "images")
	if err := os.MkdirAll(imagesDir, os.ModePerm); err != nil {
		log.Fatalf("Failed to create images directory: %v", err)
	}
	backDir := filepath.Join("..", "back")
	if err := os.MkdirAll(backDir, os.ModePerm); err != nil {
		log.Fatalf("Failed to create back directory: %v", err)
	}

	fmt.Println("Server is running on http://localhost:5001")
	if err := router.Run(":5001"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}