package main

import (
	"fmt"
	"log"
	"math/rand"
	"mime/multipart"
	"net/http"
	"path/filepath"

	"github.com/disintegration/imaging"
	"github.com/gin-gonic/gin"
)

type Card struct {
	ID      int    `json:"id"`
	Image   string `json:"image"`
	Matched bool   `json:"matched"`
}

func resizeAndSaveImage(file *multipart.FileHeader, dst string) error {
	srcFile, err := file.Open()
	if err != nil {
		return err
	}
	defer srcFile.Close()

	img, err := imaging.Decode(srcFile)
	if err != nil {
		return err
	}

	resizedImg := imaging.Resize(img, 200, 200, imaging.Lanczos)

	if err := imaging.Save(resizedImg, dst); err != nil {
		return err
	}

	return nil
}

func HandleUpload(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.String(http.StatusBadRequest, "Unable to parse form: %v", err)
		return
	}

	files := form.File["upload[]"]
	var imagePaths []string

	for _, file := range files {
		log.Println("Uploading file:", file.Filename)
		dst := filepath.Join("..", "images", file.Filename)

		if err := resizeAndSaveImage(file, dst); err != nil {
			c.String(http.StatusInternalServerError, "Unable to save file: %v", err)
			return
		}
		// Use browser-friendly path
		imagePaths = append(imagePaths, filepath.Join("/images", file.Filename))
	}

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("%d files uploaded successfully!", len(files)),
		"images":  imagePaths,
	})
}

func startGame(c *gin.Context) {
	type RequestBody struct {
		Images []string `json:"images"`
	}
	var reqBody RequestBody
	if err := c.BindJSON(&reqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	imagePaths := reqBody.Images
	cards := append(imagePaths, imagePaths...)

	rand.Shuffle(len(cards), func(i, j int) {
		cards[i], cards[j] = cards[j], cards[i]
	})

	gameCards := make([]Card, len(cards))
	for i, img := range cards {
		gameCards[i] = Card{
			ID:      i,
			Image:   img, // Already /images/... from frontend
			Matched: false,
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"cards": gameCards,
		"back":  "/back/back.jpg", // Match frontend path
	})
}