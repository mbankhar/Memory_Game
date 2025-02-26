import React, { useState } from "react";

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState<any[]>([]);

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

  const startGame = async () => {
    const response = await fetch("/start-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images }), // Wrap images in an object
    });
    const data = await response.json();
    console.log("Cards:", data.cards);
    setCards(data.cards);
    setGameStarted(true);
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const getCardSize = (cardCount: number) => {
    if (cardCount <= 8) return 192;
    if (cardCount <= 16) return 128;
    return 96;
  };

  if (gameStarted) {
    const cardSize = getCardSize(cards.length);
    return (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "20px", textAlign: "center" }}>
          Memory Game
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                width: `${cardSize}px`,
                height: `${cardSize}px`,
                backgroundColor: "#ddd",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src="/back/back.jpg"
                alt="card back"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setGameStarted(false)}
          style={{
            display: "block",
            margin: "20px auto 0",
            padding: "10px 20px",
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Back to Upload
        </button>
      </div>
    );
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