package main

import (
	"fmt"
	"log"
	"mime/multipart"
	"net/http"
	"path/filepath"

	"github.com/disintegration/imaging"
	"github.com/gin-gonic/gin"
)

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

	for _, file := range files {
		log.Println("Uploading file:", file.Filename)

		dst := filepath.Join("..", "images", file.Filename)

		if err := resizeAndSaveImage(file, dst); err != nil {
			c.String(http.StatusInternalServerError, "Unable to save file: %v", err)
			return
		}
	}

	c.String(http.StatusOK, fmt.Sprintf("%d files uploaded successfully!", len(files)))
}