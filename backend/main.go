package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"net/http"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default();

	// Serve React build as the root
	router.Static("/static", "../frontend/build/static")
	router.StaticFile("/index.html", "../frontend/build/index.html")
	router.GET("/", func(c *gin.Context) {
		c.File("../frontend/build/index.html")
	})

	// Serve images and back
	router.Static("/images", "../images")
	router.Static("/back", "../back")

	// API routes
	router.POST("/upload", HandleUpload)
	router.POST("/start-game", startGame)
	router.DELETE("/images/:filename", func(c *gin.Context) {
		filename := c.Param("filename")
		filePath := filepath.Join("..", "images", filename)
		if err := os.Remove(filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete image"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Image deleted"})
	})
	router.GET("/images", func(c *gin.Context) { // New endpoint
		imagesDir := filepath.Join("..", "images")
		files, err := os.ReadDir(imagesDir)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read images directory"})
			return
		}
		var imagePaths []string
		for _, file := range files {
			if !file.IsDir() {
				imagePaths = append(imagePaths, filepath.Join("/images", file.Name()))
			}
		}
		c.JSON(http.StatusOK, gin.H{"images": imagePaths})
	})

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