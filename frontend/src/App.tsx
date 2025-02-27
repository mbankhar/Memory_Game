import React, { useState, useEffect } from "react";
import Game from "./Game";
import "./styles.css";

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/images");
        const data = await response.json();
        setImages(Array.isArray(data.images) ? data.images : []);
        console.log("Existing images:", data.images);
      } catch (error) {
        console.error("Failed to load images:", error);
        setImages([]);
      }
    };
    fetchImages();
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImages([...images, ...data.images]);
      console.log("Response:", data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const deleteImage = async (index: number) => {
    const imageToDelete = images[index];
    const filename = imageToDelete.split('/').pop();
    try {
      const response = await fetch(`/images/${filename}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setImages(images.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  if (gameStarted) {
    return <Game images={images} onBack={() => setGameStarted(false)} />;
  }

  return (
    <div className="container">
      <h1>Upload Images</h1>
      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" name="upload[]" multiple accept="image/*" className="upload-input" />
        <button type="submit" className="upload-button">Upload</button>
      </form>
      {images.length > 0 && (
        <div className="image-grid">
          {images.map((img, index) => (
            <div key={index} className="image-container">
              <img src={img} alt="uploaded" className="image" />
              <button onClick={() => deleteImage(index)} className="delete-button">X</button>
            </div>
          ))}
        </div>
      )}
      {images.length > 0 ? (
        <button onClick={startGame} className="start-button">Start Game</button>
      ) : (
        <p className="no-images">Please upload images to start the game.</p>
      )}
    </div>
  );
};

export default App;