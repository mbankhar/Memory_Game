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

	router.Static("/frontend", "../frontend")

	router.GET("/", func(c *gin.Context) {
		c.File("../frontend/index.html")
	})

	router.POST("/upload", HandleUpload)

	imagesDir := filepath.Join("..", "images")
	if err := os.MkdirAll(imagesDir, os.ModePerm); err != nil {
		log.Fatalf("Failed to create images directory: %v", err)
	}

	fmt.Println("Server is running on http://localhost:5001")
	if err := router.Run(":5001"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}