import React, { useState, useEffect } from "react";
import Game from "./Game";

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/images");
        const data = await response.json();
        console.log("Existing images:", data.images);
        setImages(data.images);
      } catch (error) {
        console.error("Failed to load images:", error);
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
      console.log("Response:", data);
      setImages(data.images);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const startGame = () => {
    setGameStarted(true);
  };

  if (gameStarted) {
    return <Game images={images} onBack={() => setGameStarted(false)} />;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px", textAlign: "center" }}>
        Upload Images
      </h1>
      <form onSubmit={handleUpload} style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="file"
          name="upload[]"
          multiple
          accept="image/*"
          style={{ marginBottom: "10px", display: "block", margin: "0 auto" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#337ab7",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Upload
        </button>
      </form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "128px",
              height: "128px",
            }}
          >
            <img
              src={img}
              alt="uploaded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <button
              onClick={() => deleteImage(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "#d9534f",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <button
          onClick={startGame}
          style={{
            display: "block",
            margin: "20px auto 0",
            padding: "10px 20px",
            backgroundColor: "#5cb85c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default App;